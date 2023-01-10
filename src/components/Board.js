import React from 'react';

import { BettingSquare } from "./BettingSquare";

export class Board extends React.Component {
    renderSquare(i) {
        return (
            <BettingSquare
                onClick={() => this.props.onClick(i)}
                playerMark={this.props.squares[i]}
                isWinningSquare={this.props.winningSquares?.includes(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
