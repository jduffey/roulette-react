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
    transferFrom,
    getTokenBalance,
    executeWager,
    HOUSE_ADDRESS,
    ROULETTE_CONTRACT_ADDRESS,
    rouletteContractEvents,
} from '../../common/blockchainWrapper';

// Uncomment this line to simulate playing the game
// import { simulatePlayingGame } from '../../common/simulatePlayingGame';

function calculateTotalBetAmount(bets) {
    return bets.reduce((acc, pendingBet) => acc + pendingBet.betAmount, 0);
}

function isSpinAllowed(bets) {
    return bets.length > 0;
}

const CLASS_NAME = "Roulette-component";
export function Roulette(props) {
    const playerAddress = props.playerAddress;

    const [currentChipAmountSelected, setCurrentChipAmountSelected] = useState(1);

    const [pendingBets, setPendingBets] = useState([]);

    const [spinResults, setSpinResults] = useState(["36", "36", "36"]);
    const [previousRoundResultsForBetResultsInfo, setPreviousRoundResultsForBetResultsInfo] = useState(null);

    const [playerBalance, setPlayerBalance] = useState(undefined);

    const [latestBlockNumber, setLatestBlockNumber] = useState(0);

    useEffect(() => {
        let mounted = true;

        getTokenBalance(playerAddress)
            .then(balance => {
                if (mounted) {
                    setPlayerBalance(balance);
                }
            });

        return () => { mounted = false };
    }, [playerAddress, latestBlockNumber]);

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
        if (!isSpinAllowed(pendingBets)) {
            return;
        }

        if (pendingBets.length > 1) {
            alert("UNDER DEV: You can only place one bet per spin until contract can handle multiple bets.");
            setPendingBets([]);
            return;
        }

        getRandomWheelNumber(`${Date.now()}${playerAddress}`)
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

                if (owedByHouseToPlayer > 0) {
                    // console.log("House --> Player", owedByHouseToPlayer);
                    transferFrom(
                        HOUSE_ADDRESS,
                        playerAddress,
                        owedByHouseToPlayer.toString()
                    );
                }

                if (owedByPlayerToHouse > 0) {
                    // console.log("Player --> House", owedByPlayerToHouse);
                    transferFrom(
                        playerAddress,
                        HOUSE_ADDRESS,
                        owedByPlayerToHouse.toString()
                    );
                }

                // "1% of house take goes to Rewards Pool"
                const owedByHouseToRewardsPool = owedByPlayerToHouse * 0.01;
                const owedByHouseToPlayersRewards = owedByHouseToRewardsPool;
                if (owedByHouseToRewardsPool > 0) {
                    // console.log("House --> Roulette Contract", owedByHouseToRewardsPool);
                    transferFrom(
                        HOUSE_ADDRESS,
                        ROULETTE_CONTRACT_ADDRESS,
                        owedByHouseToRewardsPool.toString()
                    );
                }

                setPreviousRoundResultsForBetResultsInfo(resultsOfRound);

                copySpinResults.push(resultsOfRound.winningWheelNumber);
                setSpinResults(["00", "00", "00"]);

                // TODO update/revisit this note after replacing betsOnBoard (object) with pendingBets (array of PendingBet objects)
                // TODO bug here? if we don't reset pendingBets then we can continue to click spin, which is not a problem itself,
                // but on continuing to click does not charge the player for the bet placed, but it DOES award them winnings if they win.
                // So we maybe need to refactor this component to ensure that the player's balance is in fact deducted for the bet placed.
                // This may involve the reworking/splitting the concepts of:
                // 1. what the player is actually able to bet at any given time (i.e. the funds they "own" minus whatever bets they've already placed)
                // 2. what the player "owns" (i.e. if they had an option to clear all bets on the board, what would their balance be)
                setPendingBets([]);

                getTokenBalance(playerAddress)
                    .then(bal => {
                        setPlayerBalance(bal);
                    });

                // console.log("pendingBets", pendingBets);
                // console.log("House --> Allocated Rewards in Roulette contract", owedByHouseToPlayersRewards);
                const singlePendingBet = pendingBets[0];
                executeWager(
                    playerAddress,
                    calculateTotalBetAmount(pendingBets),
                    owedByHouseToPlayersRewards,
                    randomWheelNumber,
                    singlePendingBet.betName,
                    singlePendingBet.betAmount
                ).then((response) => {
                    console.log("blockchainWrapper.executeWager() response: ", response);

                    setLatestBlockNumber(response.blockNumber);

                    // just get the block number then use that to get the logs from that block?
                    console.log(rouletteContractEvents.filters.WheelNumber(playerAddress));
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
                isSpinAllowed={isSpinAllowed(pendingBets)}
            />
            <SpinResult
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
            />
        </div >
    );
}
