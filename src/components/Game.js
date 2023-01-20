import React from 'react';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { CurrentBetsInfo } from './CurrentBetsInfo';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { PlayerInfo } from './PlayerInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';

import { WINNING_CRITERIA } from '../common/winning-criteria';

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
        const winningCriteria = WINNING_CRITERIA[wheelNumber];
        const whichBetOptionsWon = betsOptionsPlaced.filter((betOptionPlaced) => winningCriteria.includes(betOptionPlaced));

        return whichBetOptionsWon;
    }

    handleSpinButtonClick() {
        if (!this.isSpinAllowed()) {
            return;
        }

        const wheelNumbers = [
            "0", "00",
            "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
            "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
            "30", "31", "32", "33", "34", "35", "36"
        ];
        const randomWheelNumber = wheelNumbers[Math.floor(Math.random() * wheelNumbers.length)];

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

    getWheelNumberColor(wheelNumber) {
        const redNumbers = new Set(["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"]);
        const blackNumbers = new Set(["2", "4", "6", "8", "10", "11", "13", "15", "17", "20", "22", "24", "26", "28", "29", "31", "33", "35"]);
        const greenNumbers = new Set(["0", "00"]);
        if (redNumbers.has(wheelNumber)) {
            return "#d94848";
        } else if (blackNumbers.has(wheelNumber)) {
            return "#222222";
        } else if (greenNumbers.has(wheelNumber)) {
            return "#016D29";
        }
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
                    bgColor={this.getWheelNumberColor(mostRecentSpinResult)}
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
                "1": 35,
                "2": 35,
                "3": 35,
                "4": 35,
                "5": 35,
                "6": 35,
                "7": 35,
                "8": 35,
                "9": 35,
                "10": 35,
                "11": 35,
                "12": 35,
                "13": 35,
                "14": 35,
                "15": 35,
                "16": 35,
                "17": 35,
                "18": 35,
                "19": 35,
                "20": 35,
                "21": 35,
                "22": 35,
                "23": 35,
                "24": 35,
                "25": 35,
                "26": 35,
                "27": 35,
                "28": 35,
                "29": 35,
                "30": 35,
                "31": 35,
                "32": 35,
                "33": 35,
                "34": 35,
                "35": 35,
                "36": 35,
                "0": 35,
                "00": 35,
                "1st 12": 2,
                "2nd 12": 2,
                "3rd 12": 2,
                "Top Row": 2,
                "Middle Row": 2,
                "Bottom Row": 2,
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
