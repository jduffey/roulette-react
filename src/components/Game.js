import { useEffect, useState } from 'react';
import {
    fetchPlayerBalance,
    updatePlayerBalance,
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

export function Game() {
    // tied to db wrapper calls
    const [availableBalance, setAvailableBalance] = useState("Loading...");
    const [spinResults, setSpinResults] = useState([]);

    // not tied to db wrapper calls
    const [betsOnBoard, setBetsOnBoard] = useState({});
    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);
    const [previousRoundBets, setPreviousRoundBets] = useState({});
    const [previousRoundStartingBalance, setPreviousRoundStartingBalance] = useState(null);

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

        const betAmountOnBoard = calculateTotalBetAmount(betsOnBoard);

        const startingBalance = availableBalance + betAmountOnBoard;
        const newBalance =
            getNewBalance(startingBalance, betsOnBoard, randomWheelNumber);

        const copySpinResults = spinResults;
        copySpinResults.push(randomWheelNumber);

        updatePlayerBalance(newBalance);
        setAvailableBalance(newBalance);

        updateSpinResults(copySpinResults);

        setPreviousRoundStartingBalance(availableBalance + calculateTotalBetAmount(betsOnBoard));
        setPreviousRoundBets(betsOnBoard);
        setBetsOnBoard({});
    }

    const mostRecentSpinResult = spinResults.slice(-1)[0];

    return (
        <div className='main-game'>
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
