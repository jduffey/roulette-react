import { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';

import { PendingBet } from '../../common/PendingBet';
import { getCompleteResultsOfRound } from '../../common/getCompleteResultsOfRound';
import { CompletionsCounter } from './CompletionsCounter';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { PendingBetsTable } from './PendingBetsTable';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { NumbersHitTracker } from './NumbersHitTracker';
import { PlayerInfo } from './PlayerInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';
import { HouseInfo } from './HouseInfo';

import {
    getTokenBalance,
    getPlayerAllowance,
    executeWager,
    rouletteContractEvents,
    getBlock,
} from '../../common/blockchainWrapper';

// Uncomment this line to simulate playing the game
// import { simulatePlayingGame } from '../../common/simulatePlayingGame';

function calculateTotalBetAmount(bets) {
    return bets.reduce((acc, pendingBet) => acc + pendingBet.betAmount, 0);
}

function hasABetBeenPlaced(bets) {
    return bets.length > 0;
}

const CLASS_NAME = "Roulette-component";
export function Roulette(props) {
    const playerAddress = props.playerAddress;

    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);
    const [latestBlockNumber, setLatestBlockNumber] = useState(0);
    const [pendingBets, setPendingBets] = useState([]);
    const [playerBalance, setPlayerBalance] = useState(undefined);
    const [playerAllowance, setPlayerAllowance] = useState(undefined);
    const [previousRoundResultsForBetResultsInfo, setPreviousRoundResultsForBetResultsInfo] = useState(null);
    const [wheelIsSpinning, setWheelIsSpinning] = useState(false);
    const [wheelNumber, setWheelNumber] = useState(null);
    const [error, setError] = useState(null);
    const eventListenerRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const [block, balance, allowance] = await Promise.all([
                    getBlock(),
                    getTokenBalance(playerAddress),
                    getPlayerAllowance(playerAddress)
                ]);

                if (mounted) {
                    setLatestBlockNumber(block.number);
                    setPlayerBalance(balance);
                    setPlayerAllowance(allowance);
                    setError(null);
                }
            } catch (err) {
                if (mounted) {
                    console.error("Error fetching blockchain data:", err);
                    setError("Failed to fetch blockchain data");
                }
            }
        };

        fetchData();

        return () => { mounted = false };
    }, [playerAddress, wheelIsSpinning]);

    function handleBettingSquareClick(bettingSquareName) {
        const balanceInWei = playerBalance !== undefined ? ethers.utils.parseEther(playerBalance) : ethers.BigNumber.from(0);
        const totalBetInWei = ethers.utils.parseEther(calculateTotalBetAmount(pendingBets).toString());
        const chipAmountInWei = ethers.utils.parseEther(currentChipAmountSelected.toString());
        const availableBalanceInWei = balanceInWei.sub(totalBetInWei);

        if (chipAmountInWei.gt(availableBalanceInWei)) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        const pendingBet = new PendingBet(bettingSquareName, currentChipAmountSelected);
        const copyPendingBets = pendingBets.slice();
        copyPendingBets.push(pendingBet);
        setPendingBets(copyPendingBets);
    }

    async function handleSpinButtonClick() {
        if (!hasABetBeenPlaced(pendingBets)) {
            console.log("No bets placed.");
            return;
        }

        if (pendingBets.length > 1) {
            alert("Only one bet per spin is supported right now. Please remove extra bets or wait for multi-bet support.");
            return;
        }

        if (wheelIsSpinning) {
            console.log("Wheel already spinning; please wait for wheel number.");
            return;
        }

        setWheelIsSpinning(true);
        setError(null);

        try {
            // Set up event listener before executing wager
            const handleExecutedWager = (playerAddr, wheelNum) => {
                if (playerAddr === props.playerAddress) {
                    const receivedWheelNumber = parseInt(wheelNum, 10);
                    setWheelNumber(receivedWheelNumber);
                    
                    // Calculate results based on actual blockchain result
                    const resultsOfRound = getCompleteResultsOfRound(
                        playerBalance, 
                        pendingBets, 
                        receivedWheelNumber
                    );
                    setPreviousRoundResultsForBetResultsInfo(resultsOfRound);
                    setPendingBets([]);
                    setWheelIsSpinning(false);

                    // Clean up event listener
                    if (eventListenerRef.current) {
                        rouletteContractEvents.off('ExecutedWager', eventListenerRef.current);
                        eventListenerRef.current = null;
                    }

                    // Refresh balances after spin
                    Promise.all([
                        getTokenBalance(playerAddress),
                        getPlayerAllowance(playerAddress)
                    ]).then(([bal, allowance]) => {
                        setPlayerBalance(bal);
                        setPlayerAllowance(allowance);
                    }).catch(err => {
                        console.error("Error refreshing balances:", err);
                    });
                }
            };

            // Store reference to clean up if needed
            eventListenerRef.current = handleExecutedWager;
            rouletteContractEvents.on('ExecutedWager', handleExecutedWager);

            // Execute the wager on blockchain
            const tx = await executeWager(playerAddress);
            const receipt = await tx.wait(); // Wait for transaction confirmation
            setLatestBlockNumber(receipt.blockNumber);

        } catch (err) {
            console.error("Error executing wager:", err);
            setError("Failed to execute wager. Please try again.");
            setWheelIsSpinning(false);
            
            // Clean up event listener on error
            if (eventListenerRef.current) {
                rouletteContractEvents.off('ExecutedWager', eventListenerRef.current);
                eventListenerRef.current = null;
            }
        }
    }

    // Cleanup event listener on unmount
    useEffect(() => {
        return () => {
            if (eventListenerRef.current) {
                rouletteContractEvents.off('ExecutedWager', eventListenerRef.current);
            }
        };
    }, []);

    return (
        <div
            className={CLASS_NAME}
        >
            {error && (
                <div className="error-message" style={{ color: 'red', padding: '10px' }}>
                    {error}
                </div>
            )}
            <Board
                onClick={(bettingSquareName) => handleBettingSquareClick(bettingSquareName)}
                pendingBets={pendingBets}
            />
            <ChipSelection
                onClick={(chipAmount) => setCurrentChipAmountSelected(chipAmount)}
                currentChipAmountSelected={currentChipAmountSelected}
            />
            <SpinButton
                onClick={() => handleSpinButtonClick()}
                hasABetBeenPlaced={hasABetBeenPlaced(pendingBets)}
                wheelIsSpinning={wheelIsSpinning}
            />
            <SpinResult
                spinResult={wheelNumber}
                playerAddress={playerAddress}
            />
            <MostRecentSpinResults
                playerAddress={playerAddress}
            />
            <PlayerInfo
                playerBalance={playerBalance}
                playerAllowance={playerAllowance}
                totalBetAmount={calculateTotalBetAmount(pendingBets)}
            />
            <PendingBetsTable
                pendingBets={pendingBets}
            />
            <BetResultsInfo
                previousRoundResults={previousRoundResultsForBetResultsInfo}
            />
            <NumbersHitTracker
                playerAddress={playerAddress}
            />
            <CompletionsCounter
                playerAddress={playerAddress}
            />
            <HouseInfo
                latestBlockNumber={latestBlockNumber}
            />
        </div >
    );
}
