import React from 'react';

import { BettingSquare } from "./BettingSquare";

const BET_OPTION_POSITION_DATA = [
    ["0", -80, 0, 180, 80, "#016D29"],
    ["00", -80, 180, 180, 80, "#016D29"],
    ["3", 0, 0, 120, 80, "#d94848"],
    ["6", 80, 0, 120, 80, "#222222"],
    ["9", 160, 0, 120, 80, "#d94848"],
    ["12", 240, 0, 120, 80, "#222222"],
    ["15", 320, 0, 120, 80, "#d94848"],
    ["18", 400, 0, 120, 80, "#222222"],
    ["21", 480, 0, 120, 80, "#d94848"],
    ["24", 560, 0, 120, 80, "#222222"],
    ["27", 640, 0, 120, 80, "#d94848"],
    ["30", 720, 0, 120, 80, "#222222"],
    ["33", 800, 0, 120, 80, "#d94848"],
    ["36", 880, 0, 120, 80, "#222222"],
    ["2", 0, 120, 120, 80, "#222222"],
    ["5", 80, 120, 120, 80, "#d94848"],
    ["8", 160, 120, 120, 80, "#222222"],
    ["11", 240, 120, 120, 80, "#d94848"],
    ["14", 320, 120, 120, 80, "#222222"],
    ["17", 400, 120, 120, 80, "#d94848"],
    ["20", 480, 120, 120, 80, "#222222"],
    ["23", 560, 120, 120, 80, "#d94848"],
    ["26", 640, 120, 120, 80, "#222222"],
    ["29", 720, 120, 120, 80, "#d94848"],
    ["32", 800, 120, 120, 80, "#222222"],
    ["35", 880, 120, 120, 80, "#d94848"],
    ["1", 0, 240, 120, 80, "#d94848"],
    ["4", 80, 240, 120, 80, "#222222"],
    ["7", 160, 240, 120, 80, "#d94848"],
    ["10", 240, 240, 120, 80, "#222222"],
    ["13", 320, 240, 120, 80, "#d94848"],
    ["16", 400, 240, 120, 80, "#222222"],
    ["19", 480, 240, 120, 80, "#d94848"],
    ["22", 560, 240, 120, 80, "#222222"],
    ["25", 640, 240, 120, 80, "#d94848"],
    ["28", 720, 240, 120, 80, "#222222"],
    ["31", 800, 240, 120, 80, "#d94848"],
    ["34", 880, 240, 120, 80, "#222222"],
    ["1st 12", 0, 360, 80, 320, "#016D29"],
    ["2nd 12", 320, 360, 80, 320, "#016D29"],
    ["3rd 12", 640, 360, 80, 320, "#016D29"],
    ["Top", 960, 0, 120, 120, "#016D29"],
    ["Middle", 960, 120, 120, 120, "#016D29"],
    ["Bottom", 960, 240, 120, 120, "#016D29"],
    ["1 to 18", 0, 440, 80, 160, "#016D29"],
    ["Even", 160, 440, 80, 160, "#016D29"],
    ["Red", 320, 440, 80, 160, "#d94848"],
    ["Black", 480, 440, 80, 160, "#222222"],
    ["Odd", 640, 440, 80, 160, "#016D29"],
    ["19 to 36", 800, 440, 80, 160, "#016D29"],
].reduce((acc, next) => {
    return {
        ...acc,
        [next[0]]:
        {
            left: next[1],
            top: next[2],
            height: next[3],
            width: next[4],
            backgroundColor: next[5],
        }
    };
}, {});

const ZEROS_STRAIGHT_UP = ["0", "00"];
const TOP_ROW_STRAIGHT_UP = ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"];
const MIDDLE_ROW_STRAIGHT_UP = ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"];
const BOTTOM_ROW_STRAIGHT_UP = ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"];
const DOZENS = ["1st 12", "2nd 12", "3rd 12"];
const ROWS = ["Top", "Middle", "Bottom"];
const HALVES = ["1 to 18", "Even", "Red", "Black", "Odd", "19 to 36"];

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
                {ZEROS_STRAIGHT_UP.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {TOP_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {MIDDLE_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {BOTTOM_ROW_STRAIGHT_UP.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {DOZENS.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {ROWS.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
                {HALVES.map((betName) => this.renderSquare(betName, BET_OPTION_POSITION_DATA[betName]))}
            </div>
        );
    }
}
