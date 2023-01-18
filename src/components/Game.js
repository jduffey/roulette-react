import React from 'react';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { PlayerInfo } from './PlayerInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';

import { WINNING_CRITERIA } from '../common/winning-criteria';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            betsOnBoard: {},
            playerBalance: 10000,
            currentChipAmountSelected: 1,
            mostRecentSpinResults: [],
        };
    }

    handleBettingSquareClick(bettingSquareName) {
        const currentChipAmountSelected = this.state.currentChipAmountSelected;
        const copyBetsOnBoard = Object.assign({}, this.state.betsOnBoard);

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

    handleSpinButtonClick() {
        // TODO check that there are actually bets on the board
        const wheelNumbers = [
            "0", "00",
            "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
            "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
            "30", "31", "32", "33", "34", "35", "36"
        ];
        const randomWheelNumber = wheelNumbers[Math.floor(Math.random() * wheelNumbers.length)];
        // const randomWheelNumber = "1";

        // TODO check if any bets match the criteria for winning based on the randomWheelNumber
        const betsOptionsPlaced = Object.keys(this.state.betsOnBoard);
        console.log("Bets options placed:", betsOptionsPlaced);

        const winningCriteria = WINNING_CRITERIA[randomWheelNumber];
        console.log("Winning criteria:", winningCriteria);

        const wereThereAnyWinners = betsOptionsPlaced.some((betOptionPlaced) => winningCriteria.includes(betOptionPlaced));
        console.log("Were there any winners?", wereThereAnyWinners);

        if (wereThereAnyWinners) {
            const whichBetOptionsWon = betsOptionsPlaced.filter((betOptionPlaced) => winningCriteria.includes(betOptionPlaced));
            console.log("Which bet options won?", whichBetOptionsWon);
        }

        // TODO clear the bets on the board

        const numberOfResultsToDisplay = 20;
        const mostRecentSpinResults = this.state.mostRecentSpinResults.slice(-(numberOfResultsToDisplay - 1));
        mostRecentSpinResults.push(randomWheelNumber);

        this.setState({
            mostRecentSpinResults: mostRecentSpinResults,
        });
    }

    handleChipAmountClick(chipAmount) {
        console.log(`Chip amount ${chipAmount} clicked`);
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
                />
                <SpinResult
                    spinResult={mostRecentSpinResult}
                    bgColor={this.getWheelNumberColor(mostRecentSpinResult)}
                />
                <MostRecentSpinResults
                    spinResults={this.state.mostRecentSpinResults}
                />
                <PlayerInfo
                    playerBalance={this.state.playerBalance}
                    totalBetAmount={this.calculateTotalBetAmount(this.state.betsOnBoard)}
                />
                <BetResultsInfo
                    betsOnBoard={this.state.betsOnBoard}
                />
            </div>
        );
    }
}
