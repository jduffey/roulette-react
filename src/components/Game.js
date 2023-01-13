import React from 'react';

import { Board } from "./Board";
import { GameInfo } from './GameInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';
import { ChipSelection } from './ChipSelection';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bettingHistory: [],
            playerBalance: 1000,
            mostRecentSpinResult: null,
        };
    }

    handleBettingSquareClick(bettingSquareName) {
        const copyBettingHistory = this.state.bettingHistory.slice();

        copyBettingHistory.push(bettingSquareName);

        const newBalance = this.state.playerBalance - 1;

        this.setState({
            bettingHistory: copyBettingHistory,
            playerBalance: newBalance,
        });
    }

    handleSpinAreaClick() {
        const wheelNumbers = [
            "0", "00",
            "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
            "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
            "30", "31", "32", "33", "34", "35", "36"
        ];

        const randomWheelNumber = wheelNumbers[Math.floor(Math.random() * wheelNumbers.length)];
        this.setState({
            mostRecentSpinResult: randomWheelNumber,
        });
    }

    handleChipAmountClick(chipAmount) {
        console.log(`Chip amount ${chipAmount} clicked`);
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
        } else {
            return "rgb(223, 223, 223)";
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Board
                        onClick={(bettingSquareName) => this.handleBettingSquareClick(bettingSquareName)}
                        bettingHistory={this.state.bettingHistory}
                    />
                </div>
                <div>
                    <ChipSelection
                        onClick={(chipAmount) => this.handleChipAmountClick(chipAmount)}
                    />
                </div>
                <div className="spin-area">
                    <SpinButton
                        onClick={() => this.handleSpinAreaClick()}
                        spinResult={this.state.mostRecentSpinResult}
                    />
                </div>
                <div>
                    <SpinResult
                        spinResult={this.state.mostRecentSpinResult}
                        bgColor={this.getWheelNumberColor(this.state.mostRecentSpinResult)}
                    />
                    <GameInfo
                        bettingHistory={this.state.bettingHistory}
                        playerBalance={this.state.playerBalance}
                    />
                </div>
            </div>
        );
    }
}
