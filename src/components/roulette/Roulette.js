import { useEffect, useState, useCallback } from 'react';

import { PendingBet } from '../../common/PendingBet';
import { getCompleteResultsOfRound } from '../../common/getCompleteResultsOfRound';
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
    removeBet,
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

    // Set up global event listeners for consistent updates
    useEffect(() => {
        const handleBetPlaced = (playerAddress, betName, betAmount) => {
            if (playerAddress === props.playerAddress) {
                // Refresh pending bets when a bet is placed
                refreshPendingBets();
                refreshBalances();
            }
        };

        const handleBetCleared = (playerAddress) => {
            if (playerAddress === props.playerAddress) {
                // Refresh pending bets when bets are cleared
                refreshPendingBets();
                refreshBalances();
            }
        };

        const handleExecutedWager = (playerAddress, wheelNumber, totalWinnings, totalBetsReturned) => {
            if (playerAddress === props.playerAddress) {
                // Convert wheel number to proper format for getWinningCriteria
                let parsedWheelNumber;
                const numericWheelNumber = parseInt(wheelNumber, 10);
                if (numericWheelNumber === 37) {
                    // "00" is represented as 37 in the contract
                    parsedWheelNumber = "00";
                } else {
                    // Convert to string for other numbers
                    parsedWheelNumber = numericWheelNumber.toString();
                }

                // Calculate and store previous round results for display
                const previousRoundResults = getCompleteResultsOfRound(
                    playerBalance || 0,
                    pendingBets,
                    parsedWheelNumber
                );
                setPreviousRoundResultsForBetResultsInfo(previousRoundResults);
                
                // Refresh all data when wager is executed
                refreshBalances();
                refreshPendingBets();
            }
        };

        const handleBetRemoved = (playerAddress, betIndex, betAmount) => {
            if (playerAddress === props.playerAddress) {
                // Refresh pending bets when a bet is removed
                refreshPendingBets();
                refreshBalances();
            }
        };

        // Set up event listeners
        rouletteContractEvents.on('BetPlaced', handleBetPlaced);
        rouletteContractEvents.on('BetCleared', handleBetCleared);
        rouletteContractEvents.on('BetRemoved', handleBetRemoved);
        rouletteContractEvents.on('ExecutedWager', handleExecutedWager);

        // Cleanup event listeners
        return () => {
            rouletteContractEvents.off('BetPlaced', handleBetPlaced);
            rouletteContractEvents.off('BetCleared', handleBetCleared);
            rouletteContractEvents.off('BetRemoved', handleBetRemoved);
            rouletteContractEvents.off('ExecutedWager', handleExecutedWager);
        };
    }, [props.playerAddress, refreshBalances, refreshPendingBets, playerBalance, pendingBets]);

    // Rate limiting protection
    const BET_RATE_LIMIT = 1000; // 1 second between bets
    let lastBetTime = 0;

    function handleBettingSquareClick(bettingSquareName) {
        const now = Date.now();
        if (now - lastBetTime < BET_RATE_LIMIT) {
            alert("Please wait before placing another bet!");
            return;
        }
        lastBetTime = now;

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

        // Validate total bet amount doesn't exceed balance
        const totalBetAmount = pendingBets.reduce((total, bet) => total + bet.betAmount, 0);
        if (totalBetAmount > playerBalance) {
            alert("Total bet amount exceeds available balance!");
            return;
        }

        // Add bet count validation
        if (pendingBets.length > 20) { // Match contract limit
            alert("Maximum 20 bets per spin allowed!");
            return;
        }

        if (wheelIsSpinning) {
            console.log("Wheel already spinning; please wait for wheel number.");
            return;
        }

        setWheelIsSpinning(true);

        // Set up event listener BEFORE starting the transaction
        const handleExecutedWager = (playerAddr, wheelNum, totalWinnings, totalBetsReturned) => {
            if (playerAddr === props.playerAddress) {
                // Keep wheel number as number for consistency with other components
                const numericWheelNumber = parseInt(wheelNum, 10);
                setWheelNumber(numericWheelNumber);
                setWheelIsSpinning(false);
                // Remove the listener after handling the event
                rouletteContractEvents.off('ExecutedWager', handleExecutedWager);
            }
        };

        rouletteContractEvents.on('ExecutedWager', handleExecutedWager);

        // Execute the wager transaction
        executeWager(playerAddress)
            .then((response) => response.wait()) // wait for mining
            .then((receipt) => {
                // Update block number and refresh data
                setLatestBlockNumber(receipt.blockNumber);
                refreshBalances();
                refreshPendingBets();
            })
            .catch((error) => {
                console.error('Error executing wager:', error);
                setWheelIsSpinning(false);
                alert('Failed to execute wager. Please try again.');
                // Remove the listener on error
                rouletteContractEvents.off('ExecutedWager', handleExecutedWager);
            });
    }

    function handleRemoveBet(betIndex) {
        if (wheelIsSpinning) {
            alert("Cannot remove bets while wheel is spinning!");
            return;
        }

        // Optimistically update UI
        setPendingBets(prev => prev.filter((_, index) => index !== betIndex));

        // Remove bet on blockchain
        removeBet(betIndex)
            .then((tx) => {
                console.log('Bet removed:', tx);
                return tx.wait();
            })
            .then((receipt) => {
                setLatestBlockNumber(receipt.blockNumber);
                refreshBalances();
                refreshPendingBets();
            })
            .catch((error) => {
                console.error('Error removing bet:', error);
                alert('Failed to remove bet. Please try again.');
                refreshPendingBets(); // Restore on error
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
                wheelIsSpinning={wheelIsSpinning}
                onRemoveBet={handleRemoveBet}
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
