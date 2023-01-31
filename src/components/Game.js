import { useEffect, useState } from 'react';
import {
    fetchTransactionHistory,
    updateTransactionHistory,
} from '../common/databaseWrapper';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { CurrentBetsInfo } from './CurrentBetsInfo';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { PlayerInfo } from './PlayerInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';

import { getCompleteResultsOfRound } from '../common/getCompleteResultsOfRound';
import { getRandomWheelNumber } from '../common/getRandomWheelNumber';

function calculateTotalBetAmount(bets) {
    return Object.values(bets).reduce((acc, betAmount) => acc + betAmount, 0);
}

function isSpinAllowed(bets) {
    return Object.keys(bets).length > 0;
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

const CLASS_NAME = "Game-component";
export function Game() {
    const [transactionHistory, setTransactionHistory] = useState(null);

    const [availableBalance, setAvailableBalance] = useState("Loading...");
    const [spinResults, setSpinResults] = useState([]);
    const [betsOnBoard, setBetsOnBoard] = useState({});
    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);

    const [previousRoundResultsForBetResultsInfo, setPreviousRoundResultsForBetResultsInfo] = useState(null);

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

                    const previousRoundResults = getCompleteResultsOfRound(
                        mostRecentTransaction.startingBalance,
                        mostRecentTransaction.betsPlaced,
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
        const copyBetsOnBoard = Object.assign({}, betsOnBoard);

        if (currentChipAmountSelected > availableBalance) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        if (copyBetsOnBoard[bettingSquareName]) {
            copyBetsOnBoard[bettingSquareName] += currentChipAmountSelected;
        } else {
            copyBetsOnBoard[bettingSquareName] = currentChipAmountSelected;
        }

        const newBalance = availableBalance - currentChipAmountSelected;

        setBetsOnBoard(copyBetsOnBoard);
        setAvailableBalance(newBalance);
    }

    function handleSpinButtonClick() {
        if (!isSpinAllowed(betsOnBoard)) {
            return;
        }

        const randomWheelNumber = getRandomWheelNumber();

        const copySpinResults = spinResults.slice();

        const betAmountOnBoard = calculateTotalBetAmount(betsOnBoard);

        const startingBalance = availableBalance + betAmountOnBoard;

        const mostRecentRoundResults = getCompleteResultsOfRound(startingBalance, betsOnBoard, randomWheelNumber);
        setPreviousRoundResultsForBetResultsInfo(mostRecentRoundResults);
        setAvailableBalance(mostRecentRoundResults.finalBalance);

        copySpinResults.push(mostRecentRoundResults.winningWheelNumber);
        setSpinResults(copySpinResults);

        const newTransactionForDatabase = getNewTransactionForDatabase(mostRecentRoundResults);
        const copyTransactionHistory = transactionHistory.slice();
        copyTransactionHistory.push(newTransactionForDatabase);
        setTransactionHistory(copyTransactionHistory);

        // TODO bug here? if we don't reset betsOnBoard then we can continue to click spin, which is not a problem itself,
        // but on continuing to click does not charge the player for the bet placed, but it DOES award them winnings if they win.
        // So we maybe need to refactor this component to ensure that the player's balance is in fact deducted for the bet placed.
        // This may involve the reworking/splitting the concepts of:
        // 1. what the player is actually able to bet at any given time (i.e. the funds they "own" minus whatever bets they've already placed)
        // 2. what the player "owns" (i.e. if they had an option to clear all bets on the board, what would their balance be)
        setBetsOnBoard({});

        updateTransactionHistory(copyTransactionHistory);
    }

    const mostRecentSpinResult = spinResults.slice(-1)[0];

    return (
        <div
            className={CLASS_NAME}
        >
            <Board
                onClick={(bettingSquareName) => handleBettingSquareClick(bettingSquareName)}
                betsOnBoard={betsOnBoard}
            />
            <ChipSelection
                onClick={(chipAmount) => setCurrentChipAmountSelected(chipAmount)}
                currentChipAmountSelected={currentChipAmountSelected}
            />
            <SpinButton
                onClick={() => handleSpinButtonClick()}
                isSpinAllowed={isSpinAllowed(betsOnBoard)}
            />
            <SpinResult
                spinResult={mostRecentSpinResult}
            />
            <MostRecentSpinResults
                spinResults={spinResults}
            />
            <PlayerInfo
                availableBalance={availableBalance}
                totalBetAmount={calculateTotalBetAmount(betsOnBoard)}
            />
            <CurrentBetsInfo
                betsOnBoard={betsOnBoard}
            />
            <BetResultsInfo
                previousRoundResults={previousRoundResultsForBetResultsInfo}
            />
        </div >
    );
}
