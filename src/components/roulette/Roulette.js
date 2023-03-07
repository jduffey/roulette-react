import { useEffect, useState } from 'react';

import { PendingBet } from '../../common/PendingBet';
import { getCompleteResultsOfRound } from '../../common/getCompleteResultsOfRound';
import { getRandomWheelNumber } from '../../common/getRandomWheelNumber';
import { CompletionsCounter } from './CompletionsCounter';

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

import {
    getTokenBalance,
    executeWager,
    rouletteContractEvents,
    getBlock,
} from '../../common/blockchainWrapper';

// Uncomment this line to simulate playing the game
import { simulatePlayingGame } from '../../common/simulatePlayingGame';

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
    const [previousRoundResultsForBetResultsInfo, setPreviousRoundResultsForBetResultsInfo] = useState(null);
    const [wheelIsSpinning, setWheelIsSpinning] = useState(false);
    const [wheelNumber, setWheelNumber] = useState(null);

    useEffect(() => {
        let mounted = true;

        getBlock()
            .then(block => {
                if (mounted) {
                    setLatestBlockNumber(block.number);
                }
            });

        getTokenBalance(playerAddress)
            .then(balance => {
                if (mounted) {
                    setPlayerBalance(balance);
                }
            });

        return () => { mounted = false };
    }, [playerAddress, latestBlockNumber, wheelIsSpinning]);

    function handleBettingSquareClick(bettingSquareName) {
        if (currentChipAmountSelected > playerBalance) {
            // TODO: replace player balance with playerBalance - sum(pendingBets)
            alert("You don't have enough money to place that bet!");
            return;
        }

        const pendingBet = new PendingBet(bettingSquareName, currentChipAmountSelected);
        const copyPendingBets = pendingBets.slice();
        copyPendingBets.push(pendingBet);
        setPendingBets(copyPendingBets);
    }

    function handleSpinButtonClick() {
        if (!hasABetBeenPlaced(pendingBets)) {
            console.log("No bets placed.");
            return;
        }

        if (pendingBets.length > 1) {
            console.log("UNDER DEV: You can only place one bet per spin until contract can handle multiple bets.");
            setPendingBets([]);
            return;
        }

        if (wheelIsSpinning) {
            console.log("Wheel already spinning; please wait for wheel number.");
            return;
        }

        setWheelIsSpinning(true);

        getRandomWheelNumber(`${Date.now()}${playerAddress}`)
            .then(randomWheelNumber => {
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

                if (owedByHouseToPlayer > 0) {
                    // TODO replace with contract functionality
                }

                if (owedByPlayerToHouse > 0) {
                    // TODO replace with contract functionality
                }

                // "1% of house take goes to Rewards Pool"
                const owedByHouseToRewardsPool = owedByPlayerToHouse * 0.01;
                // const owedByHouseToPlayersRewards = owedByHouseToRewardsPool;
                if (owedByHouseToRewardsPool > 0) {
                    // TODO replace with contract functionality
                }

                setPreviousRoundResultsForBetResultsInfo(resultsOfRound);

                setPendingBets([]);

                getTokenBalance(playerAddress)
                    .then(bal => {
                        setPlayerBalance(bal);
                    });

                executeWager(playerAddress)
                    .then((response) => {
                        setLatestBlockNumber(response.blockNumber);
                    })
                    .then(() => {
                        rouletteContractEvents.on('WheelNumber', (playerAddress, wheelNumber) => {
                            if (playerAddress === props.playerAddress) {
                                setWheelNumber(parseInt(wheelNumber));
                                setWheelIsSpinning(false);
                            }
                        });
                    });
            });
    }

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
            <SpinResult
                spinResult={wheelNumber}
                playerAddress={playerAddress}
            />
            <MostRecentSpinResults
                playerAddress={playerAddress}
            />
            <PlayerInfo
                playerAddress={playerAddress}
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
