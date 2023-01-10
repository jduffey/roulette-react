import React from 'react';

import { Board } from "./Board";
import { GameInfo } from './GameInfo';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bettingHistory: [],
            playerBalance: 1000,
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

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(i) => this.handleBettingSquareClick(i)}
                        bettingHistory={this.state.bettingHistory}
                    />
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
