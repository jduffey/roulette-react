import React from 'react';

import { BettingSquare } from "./BettingSquare";

export class Board extends React.Component {
    renderSquare(i) {
        return (
            <BettingSquare
                key={i}
                onClick={() => this.props.onClick(i)}
                label={i}
                isSelected={this.props.bettingHistory.includes(i)}
                betAmount={this.props.bettingHistory.filter((bet) => bet === i).length} // TODO replace this with key-value pair
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
