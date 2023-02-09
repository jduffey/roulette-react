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

import { getCompleteResultsOfRound } from '../../common/getCompleteResultsOfRound';
import { getRandomWheelNumber } from '../../common/getRandomWheelNumber';
import { CompletionsCounter } from './CompletionsCounter';

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
            acc[betName] = individualBetResult.betAmount;
            return acc;
        }, {}),
        spinResult: mostRecentRoundResults.winningWheelNumber,
        finalBalance: mostRecentRoundResults.finalBalance,
    };
}

const CLASS_NAME = "Roulette-component";
export function Roulette() {
    const [transactionHistory, setTransactionHistory] = useState([]);

    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);

    const [availableBalance, setAvailableBalance] = useState("Loading...");
    const [spinResults, setSpinResults] = useState([]);
    const [previousRoundResultsForBetResultsInfo, setPreviousRoundResultsForBetResultsInfo] = useState(null);

    const [pendingBets, setPendingBets] = useState([]);

    useEffect(() => {
        let mounted = true;

        fetchTransactionHistory()
            .then(json => {
                if (mounted) {
                    setTransactionHistory(json.history);

                    const mostRecentTransaction = json.history[json.history.length - 1];

                    if (typeof mostRecentTransaction === "undefined") {
                        setAvailableBalance(json.initialBalance);
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
                    setAvailableBalance(previousRoundResults.finalBalance);

                    setSpinResults(json.history.map(historyItem => historyItem.spinResult));
                }
            });

        return () => { mounted = false };
    }, []);

    function handleBettingSquareClick(bettingSquareName) {
        if (currentChipAmountSelected > availableBalance) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        const pendingBet = new PendingBet(bettingSquareName, currentChipAmountSelected);
        const copyPendingBets = pendingBets.slice();
        copyPendingBets.push(pendingBet);
        setPendingBets(copyPendingBets);

        const newBalance = availableBalance - currentChipAmountSelected;

        setAvailableBalance(newBalance);
    }

    function handleSpinButtonClick() {
        if (!isSpinAllowed(pendingBets)) {
            return;
        }

        getRandomWheelNumber(Date.now())
            .then(randomWheelNumber => {
                const copySpinResults = spinResults.slice();

                const betAmountOnBoard = calculateTotalBetAmount(pendingBets);

                const startingBalance = availableBalance + betAmountOnBoard;

                const resultsOfRound = getCompleteResultsOfRound(startingBalance, pendingBets, randomWheelNumber);

                setPreviousRoundResultsForBetResultsInfo(resultsOfRound);
                setAvailableBalance(resultsOfRound.finalBalance);

                copySpinResults.push(resultsOfRound.winningWheelNumber);
                setSpinResults(copySpinResults);

                const newTransactionForDatabase = getNewTransactionForDatabase(resultsOfRound);
                const copyTransactionHistory = transactionHistory.slice();
                copyTransactionHistory.push(newTransactionForDatabase);
                setTransactionHistory(copyTransactionHistory);

                // TODO update/revisit this note after replacing betsOnBoard (object) with pendingBets (array of PendingBet objects)
                // TODO bug here? if we don't reset pendingBets then we can continue to click spin, which is not a problem itself,
                // but on continuing to click does not charge the player for the bet placed, but it DOES award them winnings if they win.
                // So we maybe need to refactor this component to ensure that the player's balance is in fact deducted for the bet placed.
                // This may involve the reworking/splitting the concepts of:
                // 1. what the player is actually able to bet at any given time (i.e. the funds they "own" minus whatever bets they've already placed)
                // 2. what the player "owns" (i.e. if they had an option to clear all bets on the board, what would their balance be)
                setPendingBets([]);

                updateTransactionHistory(copyTransactionHistory);
            });
    }

    function handleResetHistoryClick() {
        fetchTransactionHistory()
            .then(json => {
                setAvailableBalance(json.initialBalance);
            }).then(() => {
                resetTransactionHistory()
                    .then(() => {
                        setTransactionHistory([]);
                        setSpinResults([]);
                        setPreviousRoundResultsForBetResultsInfo(null);
                    });
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
                availableBalance={availableBalance}
                totalBetAmount={calculateTotalBetAmount(pendingBets)}
            />
            <PendingBetsTable
                pendingBets={pendingBets}
            />
            <BetResultsInfo
                previousRoundResults={previousRoundResultsForBetResultsInfo}
            />
            <RewardsInfo
                transactionHistory={transactionHistory}
            />
            <NumbersHitTracker
                transactionHistory={transactionHistory}
            />
            <CompletionsCounter
                transactionHistory={transactionHistory}
            />
        </div >
    );
}
