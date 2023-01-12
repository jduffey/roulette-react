import React from 'react';

import { Board } from "./Board";
import { GameInfo } from './GameInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bettingHistory: [],
            playerBalance: 1000,
            mostRecentSpinResult: null,
        };
    }

    handleBettingSquareClick(i) {
        const copyBettingHistory = this.state.bettingHistory.slice();

        copyBettingHistory.push(i);

        const newBalance = this.state.playerBalance - 1;

        this.setState({
            bettingHistory: copyBettingHistory,
            playerBalance: newBalance,
        });
    }

    handleSpinAreaClick() {
        console.log("spin button clicked");
        const wheelNumbers = [...Array(36).keys()].map((i) => i + 1);
        const randomWheelNumber = wheelNumbers[Math.floor(Math.random() * wheelNumbers.length)];
        this.setState({
            mostRecentSpinResult: randomWheelNumber,
        });
        console.log(this.state.mostRecentSpinResult);
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(i) => this.handleBettingSquareClick(i)}
                        bettingHistory={this.state.bettingHistory}
                    />
                </div>
                <div className="wheel-area">
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
                    </div>
                </div>
                <div className="game-info">
                    <GameInfo
                        bettingHistory={this.state.bettingHistory}
                        playerBalance={this.state.playerBalance}
                    />
                </div>
            </div>
        );
    }
}
