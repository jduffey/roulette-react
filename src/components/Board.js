import React from 'react';

import { BettingSquare } from "./BettingSquare";

const convertBettingSquareDataToObject = (bettingSquareData) => {
    console.log("called convert");
    return bettingSquareData.reduce((acc, next) => {
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
};

const BETTING_SQUARES_STRAIGHT_UP_ZEROES = convertBettingSquareDataToObject([
    ["0", 0, 0, 180, 80, "#016D29"],
    ["00", 0, 180, 180, 80, "#016D29"],
]);

const BETTING_SQUARES_STRAIGHT_UP_1_36 = convertBettingSquareDataToObject([
    ["3", 80, 0, 120, 80, "#d94848"],
    ["6", 160, 0, 120, 80, "#222222"],
    ["9", 240, 0, 120, 80, "#d94848"],
    ["12", 320, 0, 120, 80, "#222222"],
    ["15", 400, 0, 120, 80, "#d94848"],
    ["18", 480, 0, 120, 80, "#222222"],
    ["21", 560, 0, 120, 80, "#d94848"],
    ["24", 640, 0, 120, 80, "#222222"],
    ["27", 720, 0, 120, 80, "#d94848"],
    ["30", 800, 0, 120, 80, "#222222"],
    ["33", 880, 0, 120, 80, "#d94848"],
    ["36", 960, 0, 120, 80, "#222222"],
    ["2", 80, 120, 120, 80, "#222222"],
    ["5", 160, 120, 120, 80, "#d94848"],
    ["8", 240, 120, 120, 80, "#222222"],
    ["11", 320, 120, 120, 80, "#d94848"],
    ["14", 400, 120, 120, 80, "#222222"],
    ["17", 480, 120, 120, 80, "#d94848"],
    ["20", 560, 120, 120, 80, "#222222"],
    ["23", 640, 120, 120, 80, "#d94848"],
    ["26", 720, 120, 120, 80, "#222222"],
    ["29", 800, 120, 120, 80, "#d94848"],
    ["32", 880, 120, 120, 80, "#222222"],
    ["35", 960, 120, 120, 80, "#d94848"],
    ["1", 80, 240, 120, 80, "#d94848"],
    ["4", 160, 240, 120, 80, "#222222"],
    ["7", 240, 240, 120, 80, "#d94848"],
    ["10", 320, 240, 120, 80, "#222222"],
    ["13", 400, 240, 120, 80, "#d94848"],
    ["16", 480, 240, 120, 80, "#222222"],
    ["19", 560, 240, 120, 80, "#d94848"],
    ["22", 640, 240, 120, 80, "#222222"],
    ["25", 720, 240, 120, 80, "#d94848"],
    ["28", 800, 240, 120, 80, "#222222"],
    ["31", 880, 240, 120, 80, "#d94848"],
    ["34", 960, 240, 120, 80, "#222222"],
]);

const BETTING_SQUARES_DOZENS = convertBettingSquareDataToObject([
    ["1st 12", 80, 360, 80, 320, "#016D29"],
    ["2nd 12", 400, 360, 80, 320, "#016D29"],
    ["3rd 12", 720, 360, 80, 320, "#016D29"],
]);

const BETTING_SQUARES_ROWS = convertBettingSquareDataToObject([
    ["Top", 1040, 0, 120, 120, "#016D29"],
    ["Middle", 1040, 120, 120, 120, "#016D29"],
    ["Bottom", 1040, 240, 120, 120, "#016D29"],
]);

const BETTING_SQUARES_HALVES = convertBettingSquareDataToObject([
    ["1 to 18", 80, 440, 80, 160, "#016D29"],
    ["Even", 240, 440, 80, 160, "#016D29"],
    ["Red", 400, 440, 80, 160, "#d94848"],
    ["Black", 560, 440, 80, 160, "#222222"],
    ["Odd", 720, 440, 80, 160, "#016D29"],
    ["19 to 36", 880, 440, 80, 160, "#016D29"],
]);

const bettingSquareStraightUp1_36Names = Object.keys(BETTING_SQUARES_STRAIGHT_UP_1_36);
const bettingSquareStraightUpZeroesNames = Object.keys(BETTING_SQUARES_STRAIGHT_UP_ZEROES);
const bettingSquareDozensNames = Object.keys(BETTING_SQUARES_DOZENS);
const bettingSquareRowsNames = Object.keys(BETTING_SQUARES_ROWS);
const bettingSquareHalvesNames = Object.keys(BETTING_SQUARES_HALVES);

export class Board extends React.Component {
    renderSquare(betName, styleData) {
        console.log("Rendering square: " + betName + " with styleData: " + styleData);
        return (
            <BettingSquare
                key={betName}
                onClick={() => this.props.onClick(betName)}
                betName={betName}
                betAmount={this.props.bettingHistory.filter((bet) => bet === betName).length}
                styleData={styleData}
            />
        );
    }

    render() {
        return (
            <div className="game-board">
                {bettingSquareStraightUp1_36Names.map((betName) => this.renderSquare(betName, BETTING_SQUARES_STRAIGHT_UP_1_36[betName]))}
                {bettingSquareStraightUpZeroesNames.map((betName) => this.renderSquare(betName, BETTING_SQUARES_STRAIGHT_UP_ZEROES[betName]))}
                {bettingSquareDozensNames.map((betName) => this.renderSquare(betName, BETTING_SQUARES_DOZENS[betName]))}
                {bettingSquareRowsNames.map((betName) => this.renderSquare(betName, BETTING_SQUARES_ROWS[betName]))}
                {bettingSquareHalvesNames.map((betName) => this.renderSquare(betName, BETTING_SQUARES_HALVES[betName]))}
            </div>
        );
    }
}
