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

import { getNewBalance } from '../common/getNewBalance';
import { getRandomWheelNumber } from '../common/getRandomWheelNumber';

function calculateTotalBetAmount(bets) {
    return Object.values(bets).reduce((acc, betAmount) => acc + betAmount, 0);
}

function isSpinAllowed(bets) {
    return Object.keys(bets).length > 0;
}

const CLASS_NAME = "Game-component";
export function Game() {
    const [transactionHistory, setTransactionHistory] = useState([]);

    const [availableBalance, setAvailableBalance] = useState("Loading...");
    const [spinResults, setSpinResults] = useState([]);
    const [betsOnBoard, setBetsOnBoard] = useState({});
    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);

    const [previousRoundResults, setPreviousRoundResults] = useState({
        startingBalance: 1235,
        finalBalance: 5321,
        betsPlaced: {
            "Even": {betAmount: 5, winningsOnBet: 2, betReturned: 3},
            "Odd": {betAmount: 7, winningsOnBet: 4, betReturned: 6},
            "StraightUp_00": {betAmount: 9, winningsOnBet: 6, betReturned: 9},
            "StraightUp_24": {betAmount: 11, winningsOnBet: 8, betReturned: 12},
        },
        winningWheelNumber: "24",
    });

    // const [previousRoundResults, setPreviousRoundResults] = useState({});

    useEffect(() => {
        let mounted = true;

        fetchTransactionHistory()
            .then(json => {
                if (mounted) {
                    setTransactionHistory(json.history);

                    // setPreviousRoundResults(json.history[json.history.length - 1]);

                    const availableBalance = json.history.length ?
                        json.history[json.history.length - 1].resultBalance :
                        json.initialBalance;

                    const spinResults = json.history.length ?
                        json.history.map(historyItem => historyItem.spinResult) :
                        [];

                    setAvailableBalance(availableBalance);
                    setSpinResults(spinResults);
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
        copySpinResults.push(randomWheelNumber);

        const betAmountOnBoard = calculateTotalBetAmount(betsOnBoard);

        const startingBalance = availableBalance + betAmountOnBoard;
        const newBalance =
            getNewBalance(startingBalance, betsOnBoard, randomWheelNumber);

        const newTransaction = {
            "startingBalance": startingBalance,
            "betsPlaced": betsOnBoard,
            "spinResult": randomWheelNumber,
            "resultBalance": newBalance,
        };

        const copyTransactionHistory = transactionHistory.slice();
        copyTransactionHistory.push(newTransaction);

        setAvailableBalance(newBalance);
        setSpinResults(copySpinResults);
        setTransactionHistory(copyTransactionHistory);
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
                previousRoundResults={previousRoundResults}
            />
        </div >
    );
}
