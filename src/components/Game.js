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

// import { getNewBalance } from '../common/getNewBalance';
import { getRandomWheelNumber } from '../common/getRandomWheelNumber';
import { getResultsOfBets } from '../common/getResultsOfBets';

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

    const [previousRoundResults, setPreviousRoundResults] = useState({ betsPlaced: {} });

    useEffect(() => {
        let mounted = true;

        fetchTransactionHistory()
            .then(json => {
                if (mounted) {
                    setTransactionHistory(json.history);

                    const mostRecentTransaction = json.history[json.history.length - 1];

                    let mostRecentRoundResults = {
                        betsPlaced: {},
                    };
                    if (mostRecentTransaction) {
                        mostRecentRoundResults = {
                            startingBalance: mostRecentTransaction.startingBalance,
                            finalBalance: mostRecentTransaction.finalBalance,
                            betsPlaced: getResultsOfBets(
                                mostRecentTransaction.betsPlaced,
                                mostRecentTransaction.spinResult
                            ),
                            winningWheelNumber: mostRecentTransaction.spinResult,
                        };
                    }

                    setPreviousRoundResults(mostRecentRoundResults);

                    const availableBalance = json.history.length ?
                        json.history[json.history.length - 1].finalBalance :
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
        setSpinResults(copySpinResults);

        const indiviualResultsOfBets = getResultsOfBets(betsOnBoard, randomWheelNumber);

        const betAmountOnBoard = calculateTotalBetAmount(betsOnBoard);

        const startingBalance = availableBalance + betAmountOnBoard;

        const totalFromWinnings = Object.keys(indiviualResultsOfBets).reduce((acc, bettingSquareName) => {
            const winnings = indiviualResultsOfBets[bettingSquareName].winningsOnBet;
            return acc + winnings;
        }, 0);

        const totalFromBetsReturned = Object.keys(indiviualResultsOfBets).reduce((acc, bettingSquareName) => {
            const betAmount = indiviualResultsOfBets[bettingSquareName].betReturned;
            return acc + betAmount;
        }, 0);

        const newBalance = startingBalance - betAmountOnBoard + totalFromWinnings + totalFromBetsReturned;

        const newTransaction = {
            "startingBalance": startingBalance,
            "betsPlaced": betsOnBoard,
            "spinResult": randomWheelNumber,
            "finalBalance": newBalance,
        };

        const copyTransactionHistory = transactionHistory.slice();
        copyTransactionHistory.push(newTransaction);

        const mostRecentRoundResults = {
            startingBalance: startingBalance,
            finalBalance: newBalance,
            betsPlaced: indiviualResultsOfBets,
            winningWheelNumber: randomWheelNumber,
        };

        setPreviousRoundResults(mostRecentRoundResults);

        setAvailableBalance(newBalance);
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
