import React from 'react';

import { BettingSquare } from "./BettingSquare";

export class Board extends React.Component {
    renderSquare(i) {
        return (
            <BettingSquare
                onClick={() => this.props.onClick(i)}
                label={i}
                isSelected={this.props.bettingHistory.includes(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {[...Array(12).keys()].map((i) => this.renderSquare(3 * i + 3))}
                </div>
                <div className="board-row">
                    {[...Array(12).keys()].map((i) => this.renderSquare(3 * i + 2))}
                </div>
                <div className="board-row">
                    {[...Array(12).keys()].map((i) => this.renderSquare(3 * i + 1))}
                </div>
            </div>
        );
    }
}
