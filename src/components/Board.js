import React from 'react';

import { BettingSquare } from "./BettingSquare";

const BET_OPTION_POSITION_DATA = [
    ["3", 0, 0],
    ["6", 80, 0],
    ["9", 160, 0],
    ["12", 240, 0],
    ["15", 320, 0],
    ["18", 400, 0],
    ["21", 480, 0],
    ["24", 560, 0],
    ["27", 640, 0],
    ["30", 720, 0],
    ["33", 800, 0],
    ["36", 880, 0],
    ["2", 0, 120],
    ["5", 80, 120],
    ["8", 160, 120],
    ["11", 240, 120],
    ["14", 320, 120],
    ["17", 400, 120],
    ["20", 480, 120],
    ["23", 560, 120],
    ["26", 640, 120],
    ["29", 720, 120],
    ["32", 800, 120],
    ["35", 880, 120],
    ["1", 0, 240],
    ["4", 80, 240],
    ["7", 160, 240],
    ["10", 240, 240],
    ["13", 320, 240],
    ["16", 400, 240],
    ["19", 480, 240],
    ["22", 560, 240],
    ["25", 640, 240],
    ["28", 720, 240],
    ["31", 800, 240],
    ["34", 880, 240],
].reduce((acc, next) => {
    return { ...acc, [next[0]]: { left: next[1], top: next[2] } };
}, {});

console.log(BET_OPTION_POSITION_DATA);

const TOP_ROW_STRAIGHT_UP = ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"];
const MIDDLE_ROW_STRAIGHT_UP = ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"];
const BOTTOM_ROW_STRAIGHT_UP = ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"];

export class Board extends React.Component {
    renderSquare(betName, positionData) {
        return (
            <BettingSquare
                key={betName}
                onClick={() => this.props.onClick(betName)}
                betName={betName}
                isSelected={this.props.bettingHistory.includes(betName)}
                betAmount={this.props.bettingHistory.filter((bet) => bet === betName).length} // TODO replace this with key-value pair
                positionData={positionData}
            />
        );
    }

    render() {
        return (
            <div className="game-board">
                {TOP_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {MIDDLE_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {BOTTOM_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
            </div>
        );
    }
}
