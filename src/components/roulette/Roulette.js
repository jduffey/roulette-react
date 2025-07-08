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
    placeMultipleBets,
    clearBets,
    removeBet,
    getPendingBets,
    rouletteContractEvents,
    getBlock,
    getRouletteContractTokenBalance,
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
    // const [rouletteContractBalance, setRouletteContractBalance] = useState(0);

    const refreshBalances = useCallback(async () => {
        console.log('🔍 refreshBalances called');
        console.log('🔍 Current playerAddress:', playerAddress);
        
        try {
            console.log('🔍 Getting token balance...');
            const balance = await getTokenBalance(playerAddress);
            console.log('🔍 Token balance:', balance);
            setPlayerBalance(balance);
            
            console.log('🔍 Getting player allowance...');
            const allowance = await getPlayerAllowance(playerAddress);
            console.log('🔍 Player allowance:', allowance);
            setPlayerAllowance(allowance);
        } catch (error) {
            console.error('❌ Error refreshing balances:', error);
            console.error('❌ Error details:', {
                message: error.message,
                code: error.code,
                reason: error.reason,
                data: error.data,
                stack: error.stack
            });
        }
    }, [playerAddress]);

    const refreshPendingBets = useCallback(async () => {
        console.log('🔍 refreshPendingBets called');
        console.log('🔍 Current playerAddress:', playerAddress);
        
        try {
            console.log('🔍 Calling getPendingBets...');
            const pendingBetsFromChain = await getPendingBets(playerAddress);
            console.log('🔍 Pending bets from chain:', pendingBetsFromChain);
            setPendingBets(pendingBetsFromChain);
        } catch (error) {
            console.error('❌ Error refreshing pending bets:', error);
            console.error('❌ Error details:', {
                message: error.message,
                code: error.code,
                reason: error.reason,
                data: error.data,
                stack: error.stack
            });
        }
    }, [playerAddress]);

    // const refreshRouletteContractBalance = useCallback(async () => {
    //     console.log('🔍 refreshRouletteContractBalance called');
    //     try {
    //         const balance = await getRouletteContractTokenBalance();
    //         console.log('🔍 Roulette contract balance:', balance);
    //         setRouletteContractBalance(balance);
    //     } catch (error) {
    //         console.error('❌ Error refreshing Roulette contract balance:', error);
    //     }
    // }, []);

    useEffect(() => {
        // let mounted = true;

        const initializeData = async () => {
            console.log('🔍 initializeData called');
            console.log('🔍 Current playerAddress:', playerAddress);
            
            try {
                console.log('🔍 Refreshing balances...');
                await refreshBalances();
                console.log('🔍 Refreshing pending bets...');
                await refreshPendingBets();
                // console.log('🔍 Refreshing Roulette contract balance...');
                // await refreshRouletteContractBalance();
                console.log('🔍 Getting latest block...');
                const block = await getBlock();
                console.log('🔍 Latest block:', block.number);
                setLatestBlockNumber(block.number);
            } catch (error) {
                console.error('❌ Error initializing data:', error);
                console.error('❌ Error details:', {
                    message: error.message,
                    code: error.code,
                    reason: error.reason,
                    data: error.data,
                    stack: error.stack
                });
            }
        };

        initializeData();

        // return () => { mounted = false };
    }, [playerAddress, refreshBalances, refreshPendingBets]);

    // Refresh balances when block number changes (indicating a new transaction)
    useEffect(() => {
        if (latestBlockNumber > 0) {
            refreshBalances();
            refreshPendingBets();
        }
    }, [latestBlockNumber, refreshBalances, refreshPendingBets]);

    // Set up global event listeners for consistent updates
    useEffect(() => {
        const handleBetPlaced = (playerAddress, betType, betAmount) => {
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
    const [lastBetTime, setLastBetTime] = useState(0);

    function handleBettingSquareClick(bettingSquareName) {
        console.log('🔍 handleBettingSquareClick called with:', bettingSquareName);
        console.log('🔍 Current chip amount selected:', currentChipAmountSelected);
        console.log('🔍 Current pending bets:', pendingBets);
        console.log('🔍 Current player balance:', playerBalance);
        
        const now = Date.now();
        if (now - lastBetTime < BET_RATE_LIMIT) {
            console.log('❌ Rate limit exceeded');
            alert("Please wait before placing another bet!");
            return;
        }
        setLastBetTime(now);

        const availableBalance = (playerBalance !== undefined ? parseFloat(playerBalance) : 0) - calculateTotalBetAmount(pendingBets);
        console.log('🔍 Available balance:', availableBalance);

        // Validate bet amount
        if (currentChipAmountSelected <= 0) {
            console.log('❌ Bet amount must be greater than 0');
            alert("Bet amount must be greater than 0!");
            return;
        }

        if (currentChipAmountSelected > availableBalance) {
            console.log('❌ Insufficient balance for bet');
            alert("You don't have enough money to place that bet!");
            return;
        }

        // Check if adding this bet would exceed the maximum number of bets
        if (pendingBets.length >= 20) {
            console.log('❌ Maximum 20 bets per spin allowed');
            alert("Maximum 20 bets per spin allowed!");
            return;
        }

        // Only update UI state, do not call contract
        const newBet = new PendingBet(bettingSquareName, currentChipAmountSelected);
        console.log('🔍 Creating new bet:', newBet);
        setPendingBets(prev => {
            const updated = [...prev, newBet];
            console.log('🔍 Updated pending bets:', updated);
            return updated;
        });
    }

    async function handleSpinButtonClick() {
        console.log('🔍 handleSpinButtonClick called');
        console.log('🔍 Current pendingBets:', pendingBets);
        console.log('🔍 Current playerBalance:', playerBalance);
        console.log('🔍 Current playerAddress:', playerAddress);
        
        if (!hasABetBeenPlaced(pendingBets)) {
            console.log("❌ No bets placed.");
            return;
        }

        // Validate total bet amount doesn't exceed balance
        const totalBetAmount = pendingBets.reduce((total, bet) => total + bet.betAmount, 0);
        console.log('🔍 Total bet amount:', totalBetAmount);
        if (totalBetAmount > playerBalance) {
            console.log('❌ Total bet amount exceeds available balance!');
            alert("Total bet amount exceeds available balance!");
            return;
        }

        // Add bet count validation
        if (pendingBets.length > 20) { // Match contract limit
            console.log('❌ Maximum 20 bets per spin allowed!');
            alert("Maximum 20 bets per spin allowed!");
            return;
        }

        if (wheelIsSpinning) {
            console.log("❌ Wheel already spinning; please wait for wheel number.");
            return;
        }

        console.log('🔍 Setting wheelIsSpinning to true');
        setWheelIsSpinning(true);

        // Place bets on-chain before spinning
        try {
            console.log('🔍 Placing bets:', pendingBets);
            if (pendingBets.length === 1) {
                console.log('🔍 Placing single bet:', pendingBets[0]);
                await placeBet(pendingBets[0].betName, pendingBets[0].betAmount);
            } else {
                const betNames = pendingBets.map(bet => bet.betName);
                const betAmounts = pendingBets.map(bet => bet.betAmount);
                console.log('🔍 Placing multiple bets:', { betNames, betAmounts });
                await placeMultipleBets(betNames, betAmounts);
            }
            console.log('✅ Bets placed successfully');
        } catch (error) {
            console.error('❌ Error placing bets:', error);
            console.error('❌ Error details:', {
                message: error.message,
                code: error.code,
                reason: error.reason,
                data: error.data
            });
            setWheelIsSpinning(false);
            
            // Provide more specific error messages
            let errorMessage = 'Failed to place bets. Please try again.';
            if (error.code === 'NETWORK_ERROR' || error.message.includes('network')) {
                errorMessage = 'Network error. Please check your connection and try again.';
            } else if (error.code === 'INSUFFICIENT_FUNDS') {
                errorMessage = 'Insufficient funds. Please check your balance.';
            } else if (error.reason) {
                errorMessage = `Error: ${error.reason}`;
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }
            
            alert(errorMessage);
            return;
        }

        // Set up event listener BEFORE starting the transaction
        const handleExecutedWager = (playerAddr, wheelNum, totalWinnings, totalBetsReturned) => {
            console.log('🔍 ExecutedWager event received:', { playerAddr, wheelNum, totalWinnings, totalBetsReturned });
            if (playerAddr === props.playerAddress) {
                // Keep wheel number as number for consistency with other components
                const numericWheelNumber = parseInt(wheelNum, 10);
                console.log('🔍 Setting wheel number:', numericWheelNumber);
                setWheelNumber(numericWheelNumber);
                setWheelIsSpinning(false);
                // Remove the listener after handling the event
                rouletteContractEvents.off('ExecutedWager', handleExecutedWager);
            }
        };

        rouletteContractEvents.on('ExecutedWager', handleExecutedWager);

        // Execute the wager transaction
        console.log('🔍 Calling executeWager with playerAddress:', playerAddress);
        
        // Check Roulette contract balance before executing wager
        try {
            const rouletteBalance = await getRouletteContractTokenBalance();
            console.log('🔍 Roulette contract balance before wager:', rouletteBalance);
            
            // Check if contract has enough balance to pay potential winnings
            const maxPotentialWinnings = pendingBets.reduce((total, bet) => {
                // Estimate maximum winnings (35x for straight up bets, 2x for dozens/columns, 1x for others)
                let multiplier = 1;
                if (bet.betName.includes('STRAIGHT_UP')) {
                    multiplier = 35;
                } else if (bet.betName.includes('DOZEN') || bet.betName.includes('COLUMN')) {
                    multiplier = 2;
                }
                return total + (bet.betAmount * multiplier);
            }, 0);
            console.log('🔍 Maximum potential winnings:', maxPotentialWinnings);
            
            if (parseFloat(rouletteBalance) < maxPotentialWinnings) {
                console.error('❌ Roulette contract has insufficient balance to pay potential winnings');
                console.error('❌ Contract balance:', rouletteBalance, 'Required:', maxPotentialWinnings);
                alert('Contract has insufficient balance to process wager. Please contact support.');
                setWheelIsSpinning(false);
                return;
            }
        } catch (error) {
            console.error('❌ Error checking Roulette contract balance:', error);
        }
        
        executeWager(playerAddress)
            .then((response) => {
                console.log('🔍 executeWager response received:', response);
                return response.wait(); // wait for mining
            })
            .then((receipt) => {
                console.log('🔍 executeWager transaction mined:', receipt);
                // Update block number and refresh data
                setLatestBlockNumber(receipt.blockNumber);
                refreshBalances();
                refreshPendingBets();
            })
            .catch((error) => {
                console.error('❌ Error executing wager:', error);
                console.error('❌ Error details:', {
                    message: error.message,
                    code: error.code,
                    reason: error.reason,
                    data: error.data,
                    stack: error.stack
                });
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

        // Validate bet index
        if (betIndex < 0 || betIndex >= pendingBets.length) {
            alert('Invalid bet index!');
            return;
        }

        // Store the bet to restore on error
        const betToRemove = pendingBets[betIndex];

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
                // Restore the bet on error
                setPendingBets(prev => {
                    const newBets = [...prev];
                    newBets.splice(betIndex, 0, betToRemove);
                    return newBets;
                });
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

    // const fundContract = async () => {
    //     console.log('🔍 fundContract called');
    //     try {
    //         await fundRouletteContract(1000); // Fund with 1000 tokens
    //         await refreshRouletteContractBalance();
    //     } catch (error) {
    //         console.error('❌ Error funding contract:', error);
    //         alert('Failed to fund contract. Please try again.');
    //     }
    // };

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
