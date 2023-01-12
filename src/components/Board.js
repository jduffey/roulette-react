import React from 'react';

import { BettingSquare } from "./BettingSquare";

const TOP_ROW_STRAIGHT_UP = ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"];
const MIDDLE_ROW_STRAIGHT_UP = ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"];
const BOTTOM_ROW_STRAIGHT_UP = ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"];

export class Board extends React.Component {
    renderSquare(betName) {
        return (
            <BettingSquare
                key={betName}
                onClick={() => this.props.onClick(betName)}
                betName={betName}
                isSelected={this.props.bettingHistory.includes(betName)}
                betAmount={this.props.bettingHistory.filter((bet) => bet === betName).length} // TODO replace this with key-value pair
            />
        );
    }

    render() {
        return (
            <div className="game-board">
                {TOP_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName))}
                {MIDDLE_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName))}
                {BOTTOM_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName))}
            </div>
        );
    }
}
