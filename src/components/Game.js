import { useEffect, useState, useRef } from 'react';
import { fetchPlayerBalance, updatePlayerBalance } from '../common/databaseWrapper';

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

export const Game = () => {
    const [availableBalance, setAvailableBalance] = useState("Loading...");
    const [betsOnBoard, setBetsOnBoard] = useState({});
    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);
    const [mostRecentSpinResults, setMostRecentSpinResults] = useState([]);
    const [previousRoundBets, setPreviousRoundBets] = useState({});
    const [previousRoundStartingBalance, setPreviousRoundStartingBalance] = useState(null);

    const balanceFromDatabase = useRef(0);
    useEffect(() => {
        let mounted = true;

        fetchPlayerBalance()
            .then(json => {
                // TODO need to handle error case
                if (mounted) {
                    console.log("json: ", json);
                    setAvailableBalance(json);
                    balanceFromDatabase.current = json;
                }
            });

        return () => mounted = false;
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

        updatePlayerBalance(newBalance);

        // TODO not terribly worried about this atm but setting this to 1 returns the entire slice/array; find a more robust solution
        // maybe keep track of all previous bets and just slice the last 20?
        // this will likely eventually just use a call to a db to get the last 20 results
        const numberOfResultsToDisplay = 20;
        const copyMostRecentSpinResults = mostRecentSpinResults.slice(-(numberOfResultsToDisplay - 1));
        copyMostRecentSpinResults.push(randomWheelNumber);

        setMostRecentSpinResults(copyMostRecentSpinResults);
        setPreviousRoundStartingBalance(availableBalance + calculateTotalBetAmount(betsOnBoard));
        setAvailableBalance(newBalance);
        setPreviousRoundBets(betsOnBoard);
        setBetsOnBoard({});
    }

    const mostRecentSpinResult = mostRecentSpinResults.slice(-1)[0];

    return (
        <div>
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
                spinResults={mostRecentSpinResults}
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
