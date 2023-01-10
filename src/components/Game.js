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
        const copyBettingHistory = this.state.bettingHistory.slice();

        copyBettingHistory.push(i);

        this.setState({
            bettingHistory: copyBettingHistory,
        });
    }

    render() {
        const bettingHistoryButtons = createBettingHistoryButtons(this.state.bettingHistory);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(i) => this.handleBettingSquareClick(i)}
                        bettingHistory={this.state.bettingHistory}
                    />
                </div>
                <div className="betting-history">
                    <BettingHistory
                        statusMessage={"Betting History"}
                        buttons={bettingHistoryButtons}
                    />
                </div>
            </div>
        );
    }
}

function createBettingHistoryButtons(bettingHistory) {
    return bettingHistory.map((bettingSquare, betOrderZeroIndexed) => {
        const betOrderOneIndexed = betOrderZeroIndexed + 1;

        const desc = `#${betOrderOneIndexed} - ${bettingSquare}`;

        return (
            <li key={betOrderOneIndexed}>
                <button
                    className="betting-history-button"
                >
                    {desc}
                </button>
            </li>
        );
    });
}