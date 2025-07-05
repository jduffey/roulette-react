import { useEffect, useState, useCallback } from 'react';

import { PendingBet } from '../../common/PendingBet';
import { getCompleteResultsOfRound } from '../../common/getCompleteResultsOfRound';
import { getRandomWheelNumber } from '../../common/getRandomWheelNumber';
import { CompletionsCounter } from './CompletionsCounter';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { ClearBetsButton } from './ClearBetsButton';
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
    placeBet,
    clearBets,
    getPendingBets,
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

    const refreshBalances = useCallback(async () => {
        try {
            const [balance, allowance] = await Promise.all([
                getTokenBalance(playerAddress),
                getPlayerAllowance(playerAddress)
            ]);
            setPlayerBalance(balance);
            setPlayerAllowance(allowance);
        } catch (error) {
            console.error('Error refreshing balances:', error);
        }
    }, [playerAddress]);

    const refreshPendingBets = useCallback(async () => {
        try {
            const bets = await getPendingBets(playerAddress);
            setPendingBets(bets);
        } catch (error) {
            console.error('Error refreshing pending bets:', error);
        }
    }, [playerAddress]);

    useEffect(() => {
        let mounted = true;

        const initializeData = async () => {
            try {
                const [block, balance, allowance, bets] = await Promise.all([
                    getBlock(),
                    getTokenBalance(playerAddress),
                    getPlayerAllowance(playerAddress),
                    getPendingBets(playerAddress)
                ]);

                if (mounted) {
                    setLatestBlockNumber(block.number);
                    setPlayerBalance(balance);
                    setPlayerAllowance(allowance);
                    setPendingBets(bets);
                }
            } catch (error) {
                console.error('Error initializing data:', error);
            }
        };

        initializeData();

        return () => { mounted = false };
    }, [playerAddress]);

    // Refresh balances when block number changes (indicating a new transaction)
    useEffect(() => {
        if (latestBlockNumber > 0) {
            refreshBalances();
            refreshPendingBets();
        }
    }, [latestBlockNumber, refreshBalances, refreshPendingBets]);

    function handleBettingSquareClick(bettingSquareName) {
        const availableBalance = (playerBalance !== undefined ? parseFloat(playerBalance) : 0) - calculateTotalBetAmount(pendingBets);

        if (currentChipAmountSelected > availableBalance) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        // Optimistically update UI while transaction is pending
        const newBet = new PendingBet(bettingSquareName, currentChipAmountSelected);
        setPendingBets(prev => [...prev, newBet]);

        // Place bet on the blockchain
        placeBet(bettingSquareName, currentChipAmountSelected)
            .then((tx) => {
                console.log('Bet placed:', tx);
                return tx.wait(); // wait for mining to ensure block number is available
            })
            .then((receipt) => {
                // Update latest block number from mined receipt
                setLatestBlockNumber(receipt.blockNumber);
                // Refresh pending bets & balances from chain
                refreshPendingBets();
                refreshBalances();
            })
            .catch((error) => {
                console.error('Error placing bet:', error);
                alert('Failed to place bet. Please try again.');
            });
    }

    function handleSpinButtonClick() {
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

        getRandomWheelNumber(`${Date.now()}${playerAddress}`)
            .then(randomWheelNumber => {
                const resultsOfRound = getCompleteResultsOfRound(playerBalance, pendingBets, randomWheelNumber);

                setPreviousRoundResultsForBetResultsInfo(resultsOfRound);

                executeWager(playerAddress)
                    .then((response) => response.wait()) // wait for mining first
                    .then((receipt) => {
                        // Use mined block number
                        setLatestBlockNumber(receipt.blockNumber);
                        // Refresh balances after transaction is mined
                        refreshBalances();
                        refreshPendingBets();
                    })
                    .then(() => {
                        rouletteContractEvents.on('ExecutedWager', (playerAddr, wheelNum, totalWinnings, totalBetsReturned) => {
                            if (playerAddr === props.playerAddress) {
                                setWheelNumber(parseInt(wheelNum, 10));
                                setWheelIsSpinning(false);
                            }
                        });
                    })
                    .catch((error) => {
                        console.error('Error executing wager:', error);
                        setWheelIsSpinning(false);
                        alert('Failed to execute wager. Please try again.');
                    });
            })
            .catch((error) => {
                console.error('Error getting random wheel number:', error);
                setWheelIsSpinning(false);
                alert('Failed to get random number. Please try again.');
            });
    }

    function handleClearBetsClick() {
        if (pendingBets.length === 0) {
            alert("No bets to clear!");
            return;
        }

        if (wheelIsSpinning) {
            alert("Cannot clear bets while wheel is spinning!");
            return;
        }

        // Optimistically clear UI
        setPendingBets([]);

        // Clear bets on the blockchain
        clearBets()
            .then((tx) => {
                console.log('Bets cleared:', tx);
                return tx.wait(); // wait for mining to ensure block number is available
            })
            .then((receipt) => {
                // Update latest block number from mined receipt
                setLatestBlockNumber(receipt.blockNumber);
                // Refresh balances after transaction is mined
                refreshBalances();
                refreshPendingBets();
            })
            .catch((error) => {
                console.error('Error clearing bets:', error);
                alert('Failed to clear bets. Please try again.');
                // Restore pending bets on error
                refreshPendingBets();
            });
    }

    return (
        <div
            className={CLASS_NAME}
        >
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
            <ClearBetsButton
                onClick={() => handleClearBetsClick()}
                pendingBets={pendingBets}
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
