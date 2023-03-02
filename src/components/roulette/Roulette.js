import { useEffect, useState } from 'react';
import {
    fetchTransactionHistory,
    updateTransactionHistory,
} from '../../common/databaseWrapper';

import { PendingBet } from '../../common/PendingBet';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { PendingBetsTable } from './PendingBetsTable';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { NumbersHitTracker } from './NumbersHitTracker';
import { PlayerInfo } from './PlayerInfo';
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
    JACKPOT_ADDRESS,
    HOUSE_ADDRESS,
    incrementTotalSpins,
    getTotalSpins,
    getTokenBalance,
} from '../../common/blockchainWrapper';

// Uncomment this line to simulate playing the game
// import { simulatePlayingGame } from '../../common/simulatePlayingGame';

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
export function Roulette(props) {
    const playerAddress = props.playerAddress;
    const playerDbEndpoint = props.playerDbEndpoint;

    const [stateTransactionHistory, setStateTransactionHistory] = useState([]);
    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);

    const [pendingBets, setPendingBets] = useState([]);

    const [spinResults, setSpinResults] = useState([]);
    const [previousRoundResultsForBetResultsInfo, setPreviousRoundResultsForBetResultsInfo] = useState(null);

    // Retrieved from chain
    const [playerBalance, setPlayerBalance] = useState(undefined);

    useEffect(() => {
        let mounted = true;

        getTokenBalance(playerAddress)
            .then(balance => {
                if (mounted) {
                    setPlayerBalance(balance);
                }
            });

        fetchTransactionHistory(playerDbEndpoint)
            .then(json => {
                if (mounted) {
                    setStateTransactionHistory(json.history);

                    if (json.history.length === 0) return;

                    const mostRecentTransaction = json.history[json.history.length - 1];

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

                    setSpinResults(json.history.map(historyItem => historyItem.spinResult));
                }
            });

        return () => { mounted = false };
    }, [playerDbEndpoint, playerAddress]);

    function handleBettingSquareClick(bettingSquareName) {
        if (currentChipAmountSelected > playerBalance) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        const pendingBet = new PendingBet(bettingSquareName, currentChipAmountSelected);
        const copyPendingBets = pendingBets.slice();
        copyPendingBets.push(pendingBet);
        setPendingBets(copyPendingBets);
    }

    function handleSpinButtonClick() {
        if (!isSpinAllowed(pendingBets)) {
            return;
        }

        getRandomWheelNumber(Date.now())
            .then(randomWheelNumber => {
                const copySpinResults = spinResults.slice();

                const resultsOfRound = getCompleteResultsOfRound(playerBalance, pendingBets, randomWheelNumber);

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

                // We can say that "1% of house take goes to Jackpot"
                const owedByHouseToJackpot = owedByPlayerToHouse * 0.01;

                if (owedByHouseToPlayer > 0) {
                    console.log("House --> Player", owedByHouseToPlayer);
                    transferFrom(
                        HOUSE_ADDRESS,
                        playerAddress,
                        owedByHouseToPlayer.toString()
                    );
                }

                if (owedByPlayerToHouse > 0) {
                    console.log("Player --> House", owedByPlayerToHouse);
                    transferFrom(
                        playerAddress,
                        HOUSE_ADDRESS,
                        owedByPlayerToHouse.toString()
                    );
                }

                if (owedByHouseToJackpot > 0) {
                    console.log("House --> Jackpot", owedByHouseToJackpot);
                    transferFrom(
                        HOUSE_ADDRESS,
                        JACKPOT_ADDRESS,
                        owedByHouseToJackpot.toString()
                    );
                }

                setPreviousRoundResultsForBetResultsInfo(resultsOfRound);

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

                updateTransactionHistory(copyTransactionHistory, playerDbEndpoint);

                getTokenBalance(playerAddress)
                    .then(bal => {
                        setPlayerBalance(bal);
                    });

                incrementTotalSpins().then(() => { });
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
                playerBalance={playerBalance}
                totalBetAmount={calculateTotalBetAmount(pendingBets)}
            />
            <PendingBetsTable
                pendingBets={pendingBets}
            />
            <BetResultsInfo
                previousRoundResults={previousRoundResultsForBetResultsInfo}
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
            />
        </div >
    );
}
