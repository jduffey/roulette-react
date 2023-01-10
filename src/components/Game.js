import React from 'react';

import { Board } from "./Board.js";
import { BettingHistory } from './BettingHistory';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bettingHistory: [],
        };
    }

    handleBettingSquareClick(i) {
        const bettingHistory = this.state.bettingHistory;
        const copyBettingHistory = bettingHistory.slice();

        copyBettingHistory.push(i);

        this.setState({
            bettingHistory: copyBettingHistory,
        });
    }

    render() {
        const bets = this.state.bettingHistory.map((bettingSquare, betOrderZeroIndexed) => {
            const betOrderOneIndexed = betOrderZeroIndexed + 1;

            const desc = `#${betOrderOneIndexed} - ${bettingSquare}`;

            return (
                <li key={betOrderOneIndexed}>
                    <button
                        className="historical-move-button"
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(i) => this.handleBettingSquareClick(i)}
                        bettingHistory={this.state.bettingHistory}
                    />
                </div>
                <div className="game-info">
                    <BettingHistory
                        statusMessage={"Betting History"}
                        buttons={bets}
                    />
                </div>
            </div>
        );
    }
}
