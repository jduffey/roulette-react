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
