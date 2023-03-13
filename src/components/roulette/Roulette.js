import { useEffect, useState } from 'react';

import { PendingBet } from '../../common/PendingBet';
import { getCompleteResultsOfRound } from '../../common/getCompleteResultsOfRound';
import { DEPRECTAED_getRandomWheelNumber } from '../../common/getRandomWheelNumber';
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
    getPlayerAllowance,
    executeWager,
    rouletteContractEvents,
    getBlock,
} from '../../common/blockchainWrapper';

// Uncomment this line to simulate playing the game
// import { simulatePlayingGame } from '../../common/simulatePlayingGame';

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
    const [playerAllowance, setPlayerAllowance] = useState(undefined);
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

        getPlayerAllowance(playerAddress)
            .then(allowance => {
                if (mounted) {
                    setPlayerAllowance(allowance);
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

        DEPRECTAED_getRandomWheelNumber(`${Date.now()}${playerAddress}`)
            .then(randomWheelNumber => {
                const resultsOfRound = getCompleteResultsOfRound(playerBalance, pendingBets, randomWheelNumber);

                setPreviousRoundResultsForBetResultsInfo(resultsOfRound);

                setPendingBets([]);

                getTokenBalance(playerAddress)
                    .then(bal => {
                        setPlayerBalance(bal);
                    });

                getPlayerAllowance(playerAddress)
                    .then(allowance => {
                        setPlayerAllowance(allowance);
                    });

                executeWager(playerAddress)
                    .then((response) => {
                        setLatestBlockNumber(response.blockNumber);
                    })
                    .then(() => {
                        rouletteContractEvents.on('ExecutedWager', (playerAddr, wheelNum) => {
                            if (playerAddr === props.playerAddress) {
                                setWheelNumber(parseInt(wheelNum, 10));
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
                playerBalance={playerBalance}
                playerAllowance={playerAllowance}
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
