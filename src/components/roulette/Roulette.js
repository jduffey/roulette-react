import { useEffect, useState } from 'react';
import {
    fetchTransactionHistory,
    updateTransactionHistory,
    resetTransactionHistory,
} from '../../common/databaseWrapper';

import { PendingBet } from '../../common/PendingBet';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { PendingBetsTable } from './PendingBetsTable';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { NumbersHitTracker } from './NumbersHitTracker';
import { PlayerInfo } from './PlayerInfo';
import { RewardsInfo } from './RewardsInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';
import { HouseInfo } from './HouseInfo';

import { getCompleteResultsOfRound } from '../../common/getCompleteResultsOfRound';
import { getRandomWheelNumber } from '../../common/getRandomWheelNumber';
import { CompletionsCounter } from './CompletionsCounter';
import {
    NumbersHitGameCounter,
    NumbersHitGameCounterOverlay,
} from './NumberHitGameCounter';

import {
    transferFrom,
    FIRST_PLAYER_ADDRESS,
    REWARDS_ADDRESS,
    HOUSE_ADDRESS,
    incrementGamesPlayedCounter,
    getGamesPlayedCounter,
    getTokenBalance,
} from '../../common/blockchainWrapper';

// Uncomment this line to simulate playing the game
// import { simulatePlayingGame } from '../../common/simulatePlayingGame';

const INITIAL_BALANCE = 100_000;

function calculateTotalBetAmount(bets) {
    return bets.reduce((acc, pendingBet) => acc + pendingBet.betAmount, 0);
}

function isSpinAllowed(bets) {
    return bets.length > 0;
}

function getNewTransactionForDatabase(mostRecentRoundResults) {
    return {
        startingBalance: mostRecentRoundResults.startingBalance,
        betsPlaced: Object.entries(mostRecentRoundResults.resultsOfBets).reduce((acc, [betName, individualBetResult]) => {
            acc[betName] = (acc[betName] || 0) + individualBetResult.betAmount;
            return acc;
        }, {}),
        spinResult: mostRecentRoundResults.winningWheelNumber,
        finalBalance: mostRecentRoundResults.finalBalance,
    };
}

const CLASS_NAME = "Roulette-component";
export function Roulette() {
    const [stateTransactionHistory, setStateTransactionHistory] = useState([]);
    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);

    const [pendingBets, setPendingBets] = useState([]);

    const [spinResults, setSpinResults] = useState([]);
    const [previousRoundResultsForBetResultsInfo, setPreviousRoundResultsForBetResultsInfo] = useState(null);

    // TODO retrieve from chain
    const [playerBalance, setPlayerBalance] = useState("Loading...");

    // Retrieved from chain
    const [houseBalance, setHouseBalance] = useState(undefined);
    const [gamesPlayed, setGamesPlayed] = useState(undefined);

    useEffect(() => {
        let mounted = true;

        fetchTransactionHistory()
            .then(json => {
                if (mounted) {
                    setStateTransactionHistory(json.history);

                    const mostRecentTransaction = json.history[json.history.length - 1];

                    if (typeof mostRecentTransaction === "undefined") {
                        setPlayerBalance(INITIAL_BALANCE);
                        return;
                    }

                    const transactionBetsPlacedAsPendingBets =
                        Object.entries(mostRecentTransaction.betsPlaced).reduce((acc, [betName, betAmount]) => {
                            acc.push(new PendingBet(betName, betAmount));
                            return acc;
                        }, []);

                    const previousRoundResults = getCompleteResultsOfRound(
                        mostRecentTransaction.startingBalance,
                        transactionBetsPlacedAsPendingBets,
                        mostRecentTransaction.spinResult,
                    );
                    setPreviousRoundResultsForBetResultsInfo(previousRoundResults);
                    setPlayerBalance(previousRoundResults.finalBalance);

                    setSpinResults(json.history.map(historyItem => historyItem.spinResult));

                }
            });

        getTokenBalance(HOUSE_ADDRESS)
            .then(bal => {
                setHouseBalance(bal);
            });

        getGamesPlayedCounter()
            .then(count => {
                const parsedCount = parseInt(count._hex, 16);
                setGamesPlayed(parsedCount);
            });

        return () => { mounted = false };
    }, [houseBalance, gamesPlayed]);

    function handleBettingSquareClick(bettingSquareName) {
        if (currentChipAmountSelected > playerBalance) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        const pendingBet = new PendingBet(bettingSquareName, currentChipAmountSelected);
        const copyPendingBets = pendingBets.slice();
        copyPendingBets.push(pendingBet);
        setPendingBets(copyPendingBets);

        const newBalance = playerBalance - currentChipAmountSelected;

        setPlayerBalance(newBalance);
    }

    function handleSpinButtonClick() {
        if (!isSpinAllowed(pendingBets)) {
            return;
        }

        getRandomWheelNumber(Date.now())
            .then(randomWheelNumber => {
                const copySpinResults = spinResults.slice();

                const betAmountOnBoard = calculateTotalBetAmount(pendingBets);

                const startingBalance = playerBalance + betAmountOnBoard;

                const resultsOfRound = getCompleteResultsOfRound(startingBalance, pendingBets, randomWheelNumber);

                // Go through each bet and sum the total owed back to the player
                const owedByHouseToPlayer = Object.entries(resultsOfRound.resultsOfBets).reduce((acc, [_betName, individualBetResult]) => {
                    if (individualBetResult.didBetWin) {
                        acc += individualBetResult.winningsOnBet;
                    }
                    return acc;
                }, 0);

                const owedByPlayerToHouse = Object.entries(resultsOfRound.resultsOfBets).reduce((acc, [_betName, individualBetResult]) => {
                    if (!individualBetResult.didBetWin) {
                        acc += individualBetResult.betAmount;
                    }
                    return acc;
                }, 0);

                // We can say that "1% of house take goes to rewards"
                const owedByHouseToRewards = owedByPlayerToHouse * 0.01;

                if (owedByHouseToPlayer > 0) {
                    console.log("House --> Player", owedByHouseToPlayer);
                    transferFrom(
                        HOUSE_ADDRESS,
                        FIRST_PLAYER_ADDRESS,
                        owedByHouseToPlayer.toString()
                    );
                }

                if (owedByPlayerToHouse > 0) {
                    console.log("Player --> House", owedByPlayerToHouse);
                    transferFrom(
                        FIRST_PLAYER_ADDRESS,
                        HOUSE_ADDRESS,
                        owedByPlayerToHouse.toString()
                    );
                }

                if (owedByHouseToRewards > 0) {
                    console.log("House --> Rewards", owedByHouseToRewards);
                    transferFrom(
                        HOUSE_ADDRESS,
                        REWARDS_ADDRESS,
                        owedByHouseToRewards.toString()
                    );
                }

                setPreviousRoundResultsForBetResultsInfo(resultsOfRound);
                setPlayerBalance(resultsOfRound.finalBalance);

                copySpinResults.push(resultsOfRound.winningWheelNumber);
                setSpinResults(copySpinResults);

                const newTransactionForDatabase = getNewTransactionForDatabase(resultsOfRound);
                const copyTransactionHistory = stateTransactionHistory.slice();
                copyTransactionHistory.push(newTransactionForDatabase);
                setStateTransactionHistory(copyTransactionHistory);

                // TODO update/revisit this note after replacing betsOnBoard (object) with pendingBets (array of PendingBet objects)
                // TODO bug here? if we don't reset pendingBets then we can continue to click spin, which is not a problem itself,
                // but on continuing to click does not charge the player for the bet placed, but it DOES award them winnings if they win.
                // So we maybe need to refactor this component to ensure that the player's balance is in fact deducted for the bet placed.
                // This may involve the reworking/splitting the concepts of:
                // 1. what the player is actually able to bet at any given time (i.e. the funds they "own" minus whatever bets they've already placed)
                // 2. what the player "owns" (i.e. if they had an option to clear all bets on the board, what would their balance be)
                setPendingBets([]);

                updateTransactionHistory(copyTransactionHistory);

                getTokenBalance(HOUSE_ADDRESS)
                    .then(bal => {
                        setHouseBalance(bal);
                    });

                incrementGamesPlayedCounter()
                    .then(() => getGamesPlayedCounter()
                        .then(count => {
                            const parsedCount = parseInt(count._hex, 16);
                            setGamesPlayed(parsedCount);
                        }));
            });
    }

    function handleResetHistoryClick() {
        resetTransactionHistory()
            .then(() => {
                setPlayerBalance(INITIAL_BALANCE);
                setStateTransactionHistory([]);
                setSpinResults([]);
                setPreviousRoundResultsForBetResultsInfo(null);
            });
    }

    const mostRecentSpinResult = spinResults.slice(-1)[0];

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
                isSpinAllowed={isSpinAllowed(pendingBets)}
            />
            <SpinResult
                spinResult={mostRecentSpinResult}
            />
            <MostRecentSpinResults
                spinResults={spinResults}
            />
            <PlayerInfo
                onClick={() => handleResetHistoryClick()}
                playerBalance={playerBalance}
                totalBetAmount={calculateTotalBetAmount(pendingBets)}
            />
            <PendingBetsTable
                pendingBets={pendingBets}
            />
            <BetResultsInfo
                previousRoundResults={previousRoundResultsForBetResultsInfo}
            />
            <RewardsInfo
                // TODO disable won/lost/tie counter
                // leave only the games played counter (and the rewards balance which already works)
                // create contract that incremenets every time a game is played
                // then create a call to that contract to get the number of games played
                transactionHistory={stateTransactionHistory}
                gamesPlayed={gamesPlayed}
            />
            <NumbersHitTracker
                transactionHistory={stateTransactionHistory}
            />
            <CompletionsCounter
                transactionHistory={stateTransactionHistory}
            />
            <NumbersHitGameCounter
                transactionHistory={stateTransactionHistory}
            />
            <NumbersHitGameCounterOverlay
                transactionHistory={stateTransactionHistory}
            />
            <HouseInfo
                houseBalance={houseBalance}
            />
        </div >
    );
}
