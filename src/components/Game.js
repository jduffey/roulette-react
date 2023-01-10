import React from 'react';

import { Board } from "./Board.js";
import { GameInfo } from './GameInfo';
import { calculateWinner } from '../utils/calculateWinner';

const [playerOneMark, playerTwoMark] = ['X', 'O'];
const MAXIMUM_MOVES = 9;

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            isPlayerOneNext: true,
            hasGameBeenWon: false,
            winningMark: null,
            isGameADraw: false,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // Make a copy of the data instead of mutating it

        if (this.state.hasGameBeenWon || squares[i]) {
            return;
        }

        squares[i] = this.state.isPlayerOneNext ? playerOneMark : playerTwoMark;
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            isPlayerOneNext: !this.state.isPlayerOneNext,
        });

        const winner = calculateWinner(squares).winner;
        if (winner) {
            this.setState({
                hasGameBeenWon: true,
                winningMark: winner,
            });
        }
        if (this.state.history.length === MAXIMUM_MOVES && !winner) {
            this.setState({
                isGameADraw: true,
            });
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winningData = calculateWinner(current.squares);

        const moves = history.map((_, move) => {
            if (move === 0) return null;

            const playerMark = move % 2 !== 0 ? playerOneMark : playerTwoMark
            const desc = `Move #${move} - ${playerMark}`;

            return (
                <li key={move}>
                    <button
                        className="historical-move-button"
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        const statusMessage = getStatusMessage(this.state);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winningSquares={winningData?.winningSquares}
                    />
                </div>
                <div className="game-info">
                    <GameInfo
                        statusMessage={statusMessage}
                        buttons={moves}
                    />
                </div>
            </div>
        );
    }
}

function getStatusMessage(props) {
    if (props.isGameADraw) {
        return "Draw";
    } else if (props.hasGameBeenWon) {
        return 'Winner: ' + props.winningMark;
    }
    return 'Next player: ' + (props.isPlayerOneNext ? playerOneMark : playerTwoMark);
}
