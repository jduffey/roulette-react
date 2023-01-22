import React from 'react';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { CurrentBetsInfo } from './CurrentBetsInfo';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { PlayerInfo } from './PlayerInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';

import { getRandomWheelNumber } from '../common/getRandomWheelNumber';
import { getWinningCriteria } from '../common/winning-criteria';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        const initialPlayerBalance = 10000;
        this.state = {
            betsOnBoard: {},
            playerBalance: initialPlayerBalance,
            currentChipAmountSelected: 1,
            mostRecentSpinResults: [],
            mostRecentWinningBetOptions: [],
            previousRoundBets: {},
            previousRoundStartingBalance: null,
        };
    }

    isSpinAllowed() {
        return Object.keys(this.state.betsOnBoard).length > 0;
    }

    handleBettingSquareClick(bettingSquareName) {
        const currentChipAmountSelected = this.state.currentChipAmountSelected;
        const copyBetsOnBoard = Object.assign({}, this.state.betsOnBoard);

        if (currentChipAmountSelected > this.state.playerBalance) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        if (copyBetsOnBoard[bettingSquareName]) {
            copyBetsOnBoard[bettingSquareName] += currentChipAmountSelected;
        } else {
            copyBetsOnBoard[bettingSquareName] = currentChipAmountSelected;
        }

        const newBalance = this.state.playerBalance - currentChipAmountSelected;

        this.setState({
            betsOnBoard: copyBetsOnBoard,
            playerBalance: newBalance,
        });
    }

    getWinningBetOptions(wheelNumber) {
        const betsOptionsPlaced = Object.keys(this.state.betsOnBoard);
        const winningCriteria = getWinningCriteria(wheelNumber);
        const whichBetOptionsWon = betsOptionsPlaced.filter((betOptionPlaced) => winningCriteria.includes(betOptionPlaced));

        return whichBetOptionsWon;
    }

    handleSpinButtonClick() {
        if (!this.isSpinAllowed()) {
            return;
        }

        const randomWheelNumber = getRandomWheelNumber();

        const winningBetOptions = this.getWinningBetOptions(randomWheelNumber);

        const winningsPlusReturnedBets = this.calculateWinningsPlusReturnedBets(this.state.betsOnBoard, winningBetOptions);

        const newPlayerBalance = this.state.playerBalance + winningsPlusReturnedBets;

        // TODO not terribly worried about this atm but setting this to 1 returns the entire slice/array; find a more robust solution
        const numberOfResultsToDisplay = 20;
        const mostRecentSpinResults = this.state.mostRecentSpinResults.slice(-(numberOfResultsToDisplay - 1));
        mostRecentSpinResults.push(randomWheelNumber);

        this.setState({
            previousRoundStartingBalance: this.state.playerBalance + this.calculateTotalBetAmount(this.state.betsOnBoard),
            playerBalance: newPlayerBalance,
            mostRecentWinningBetOptions: winningBetOptions,
            previousRoundBets: this.state.betsOnBoard,
            betsOnBoard: {},
            mostRecentSpinResults: mostRecentSpinResults,
        });
    }

    handleChipAmountClick(chipAmount) {
        this.setState({
            currentChipAmountSelected: chipAmount,
        });
    }

    calculateTotalBetAmount(bets) {
        return Object.values(bets).reduce((acc, betAmount) => acc + betAmount, 0);
    }

    render() {
        const mostRecentSpinResult = this.state.mostRecentSpinResults.slice(-1)[0];
        const playerBalance = this.state.playerBalance;
        return (
            <div>
                <Board
                    onClick={(bettingSquareName) => this.handleBettingSquareClick(bettingSquareName)}
                    betsOnBoard={this.state.betsOnBoard}
                />
                <ChipSelection
                    onClick={(chipAmount) => this.handleChipAmountClick(chipAmount)}
                    currentChipAmountSelected={this.state.currentChipAmountSelected}
                />
                <SpinButton
                    onClick={() => this.handleSpinButtonClick()}
                    isSpinAllowed={this.isSpinAllowed()}
                />
                <SpinResult
                    spinResult={mostRecentSpinResult}
                />
                <MostRecentSpinResults
                    spinResults={this.state.mostRecentSpinResults}
                />
                <PlayerInfo
                    availableBalance={playerBalance} // TODO bug is here? Appears to not always add winnings to balance, but sometimes does..?
                    totalBetAmount={this.calculateTotalBetAmount(this.state.betsOnBoard)}
                />
                <CurrentBetsInfo
                    betsOnBoard={this.state.betsOnBoard}
                />
                <BetResultsInfo
                    startingBalance={this.state.previousRoundStartingBalance}
                    bets={this.state.previousRoundBets}
                    winningWheelNumber={mostRecentSpinResult}
                />
            </div >
        );
    }

    calculateWinningsPlusReturnedBets(betsOnBoard, winningBetOptions) {
        const winnings = Object.keys(betsOnBoard).reduce((acc, betOption) => {
            const multipliers = {
                "StraightUp_1": 35,
                "StraightUp_2": 35,
                "StraightUp_3": 35,
                "StraightUp_4": 35,
                "StraightUp_5": 35,
                "StraightUp_6": 35,
                "StraightUp_7": 35,
                "StraightUp_8": 35,
                "StraightUp_9": 35,
                "StraightUp_10": 35,
                "StraightUp_11": 35,
                "StraightUp_12": 35,
                "StraightUp_13": 35,
                "StraightUp_14": 35,
                "StraightUp_15": 35,
                "StraightUp_16": 35,
                "StraightUp_17": 35,
                "StraightUp_18": 35,
                "StraightUp_19": 35,
                "StraightUp_20": 35,
                "StraightUp_21": 35,
                "StraightUp_22": 35,
                "StraightUp_23": 35,
                "StraightUp_24": 35,
                "StraightUp_25": 35,
                "StraightUp_26": 35,
                "StraightUp_27": 35,
                "StraightUp_28": 35,
                "StraightUp_29": 35,
                "StraightUp_30": 35,
                "StraightUp_31": 35,
                "StraightUp_32": 35,
                "StraightUp_33": 35,
                "StraightUp_34": 35,
                "StraightUp_35": 35,
                "StraightUp_36": 35,
                "StraightUp_0": 35,
                "StraightUp_00": 35,
                "1st 12": 2,
                "2nd 12": 2,
                "3rd 12": 2,
                "1st Column": 2,
                "2nd Column": 2,
                "3rd Column": 2,
                "1 to 18": 1,
                "19 to 36": 1,
                "Even": 1,
                "Odd": 1,
                "Red": 1,
                "Black": 1,
            };

            return acc +
                (winningBetOptions.includes(betOption) ?
                    betsOnBoard[betOption] * multipliers[betOption] :
                    0);
        }, 0);

        const betsReturned = Object.keys(betsOnBoard).reduce((acc, betOption) => {
            return acc +
                (winningBetOptions.includes(betOption) ?
                    betsOnBoard[betOption] :
                    0);
        }, 0);

        return winnings + betsReturned;
    }
}
