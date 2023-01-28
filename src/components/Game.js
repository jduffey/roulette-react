import { useEffect, useState, useRef } from 'react';
import {
    fetchPlayerBalance,
    updatePlayerBalance,

    updateBetsPlaced,
    fetchBetsPlaced,

    fetchPreviousRoundStartingBalance,
    updatePreviousRoundStartingBalance,

    fetchSpinResults,
    updateSpinResults,
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

// function fetchAndSet(mounted, fetcher, setter) {
//     fetcher()
//         .then(json => {
//             if (mounted) {
//                 setter(json);
//             }
//         });
// }

const CLASS_NAME = "Game-component";
export function Game() {
    // tied to db wrapper calls
    const [availableBalance, setAvailableBalance] = useState("Loading...");
    const [spinResults, setSpinResults] = useState([]);
    const [previousRoundBets, setPreviousRoundBets] = useState({});
    const [previousRoundStartingBalance, setPreviousRoundStartingBalance] = useState(null);

    // not tied to db wrapper calls
    const [betsOnBoard, setBetsOnBoard] = useState({});
    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);

    useEffect(() => {
        let mounted = true;

        fetchPlayerBalance()
            .then(json => {
                if (mounted) {
                    setAvailableBalance(json);
                }
            });

        fetchSpinResults()
            .then(json => {
                if (mounted) {
                    setSpinResults(json);
                }
            });

        fetchBetsPlaced()
            .then(json => {
                if (mounted) {
                    setPreviousRoundBets(json);
                }
            });

        fetchPreviousRoundStartingBalance()
            .then(json => {
                if (mounted) {
                    setPreviousRoundStartingBalance(json);
                }
            });

        // fetchAndSet(mounted, fetchPlayerBalance, setAvailableBalance);
        // fetchAndSet(mounted, fetchSpinResults, setSpinResults);
        // fetchAndSet(mounted, fetchBetsPlaced, setPreviousRoundBets);
        // fetchAndSet(mounted, fetchPreviousRoundStartingBalance, setPreviousRoundStartingBalance);

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

        updateBetsPlaced(betsOnBoard)
            .then(() =>
                fetchBetsPlaced()
                    .then(json => {
                        setPreviousRoundBets(json);
                    })
            );

        const randomWheelNumber = getRandomWheelNumber();

        const betAmountOnBoard = calculateTotalBetAmount(betsOnBoard);

        const startingBalance = availableBalance + betAmountOnBoard;
        const newBalance =
            getNewBalance(startingBalance, betsOnBoard, randomWheelNumber);

        const copySpinResults = spinResults;
        copySpinResults.push(randomWheelNumber);

        updatePlayerBalance(newBalance);
        setAvailableBalance(newBalance);

        updateSpinResults(copySpinResults);

        updatePreviousRoundStartingBalance(availableBalance + calculateTotalBetAmount(betsOnBoard))
            .then(() =>
                fetchPreviousRoundStartingBalance()
                    .then(json => {
                        setPreviousRoundStartingBalance(json);
                    })
            );

        setBetsOnBoard({});
    }

    const mostRecentSpinResult = spinResults[spinResults.length - 1];

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
                startingBalance={previousRoundStartingBalance}
                bets={previousRoundBets}
                winningWheelNumber={mostRecentSpinResult}
            />
        </div >
    );
}
