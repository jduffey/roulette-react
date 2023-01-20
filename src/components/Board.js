import React from 'react';

import { StraightUp1To36 } from './BettingOptions/StraightUp1To36';
import { StraightUpZeroes } from './BettingOptions/StraightUpZeroes';
import { Dozens } from './BettingOptions/Dozens';
import { Rows } from './BettingOptions/Rows';
import { Halves } from './BettingOptions/Halves';

const convertBettingSquareDataToObject = (bettingSquareData) => {
    return bettingSquareData.reduce((acc, next) => {
        return {
            ...acc,
            [next[0]]:
            {
                styleData: {
                    left: next[1],
                    top: next[2],
                    backgroundColor: next[3],
                },
                displayText: next[4],
            }
        };
    }, {});
};

const BETTING_SQUARES_STRAIGHT_UP_1_36 = convertBettingSquareDataToObject([
    // Top row
    ["3", 80, 0, "#d94848", "3"],
    ["6", 160, 0, "#222222", "6"],
    ["9", 240, 0, "#d94848", "9"],
    ["12", 320, 0, "#d94848", "12"],
    ["15", 400, 0, "#222222", "15"],
    ["18", 480, 0, "#d94848", "18"],
    ["21", 560, 0, "#d94848", "21"],
    ["24", 640, 0, "#222222", "24"],
    ["27", 720, 0, "#d94848", "27"],
    ["30", 800, 0, "#d94848", "30"],
    ["33", 880, 0, "#222222", "33"],
    ["36", 960, 0, "#d94848", "36"],
    // Middle row
    ["2", 80, 120, "#222222", "2"],
    ["5", 160, 120, "#d94848", "5"],
    ["8", 240, 120, "#222222", "8"],
    ["11", 320, 120, "#222222", "11"],
    ["14", 400, 120, "#d94848", "14"],
    ["17", 480, 120, "#222222", "17"],
    ["20", 560, 120, "#222222", "20"],
    ["23", 640, 120, "#d94848", "23"],
    ["26", 720, 120, "#222222", "26"],
    ["29", 800, 120, "#222222", "29"],
    ["32", 880, 120, "#d94848", "32"],
    ["35", 960, 120, "#222222", "35"],
    // Bottom row
    ["1", 80, 240, "#d94848", "1"],
    ["4", 160, 240, "#222222", "4"],
    ["7", 240, 240, "#d94848", "7"],
    ["10", 320, 240, "#222222", "10"],
    ["13", 400, 240, "#222222", "13"],
    ["16", 480, 240, "#d94848", "16"],
    ["19", 560, 240, "#d94848", "19"],
    ["22", 640, 240, "#222222", "22"],
    ["25", 720, 240, "#d94848", "25"],
    ["28", 800, 240, "#222222", "28"],
    ["31", 880, 240, "#222222", "31"],
    ["34", 960, 240, "#d94848", "34"],
]);

const BETTING_SQUARES_STRAIGHT_UP_ZEROES = convertBettingSquareDataToObject([
    ["0", 0, 180, "#016D29", "0"],
    ["00", 0, 0, "#016D29", "00"],
]);

const BETTING_SQUARES_DOZENS = convertBettingSquareDataToObject([
    ["1st 12", 80, 360, "#016D29", "1st 12"],
    ["2nd 12", 400, 360, "#016D29", "2nd 12"],
    ["3rd 12", 720, 360, "#016D29", "3rd 12"],
]);

const BETTING_SQUARES_ROWS = convertBettingSquareDataToObject([
    ["Top Row", 1040, 0, "#016D29", "2 to 1"],
    ["Middle Row", 1040, 120, "#016D29", "2 to 1"],
    ["Bottom Row", 1040, 240, "#016D29", "2 to 1"],
]);

const BETTING_SQUARES_HALVES = convertBettingSquareDataToObject([
    ["1 to 18", 80, 440, "#016D29", "1 to 18"],
    ["Even", 240, 440, "#016D29", "Even"],
    ["Red", 400, 440, "#d94848", "Red"],
    ["Black", 560, 440, "#222222", "Black"],
    ["Odd", 720, 440, "#016D29", "Odd"],
    ["19 to 36", 880, 440, "#016D29", "19 to 36"],
]);

const bettingSquares1To36Names = Object.keys(BETTING_SQUARES_STRAIGHT_UP_1_36);
const bettingSquareStraightUpZeroesNames = Object.keys(BETTING_SQUARES_STRAIGHT_UP_ZEROES);
const bettingSquareDozensNames = Object.keys(BETTING_SQUARES_DOZENS);
const bettingSquareRowsNames = Object.keys(BETTING_SQUARES_ROWS);
const bettingSquareHalvesNames = Object.keys(BETTING_SQUARES_HALVES);

export class Board extends React.Component {
    render1To36Squares(betName, displayData) {
        return (
            <StraightUp1To36
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
            />
        );
    }

    renderZeroesSquares(betName, displayData) {
        return (
            <StraightUpZeroes
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
            />
        );
    }

    renderDozensSquares(betName, displayData) {
        return (
            <Dozens
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
            />
        );
    }

    renderRowsSquares(betName, displayData) {
        return (
            <Rows
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
            />
        );
    }

    renderHalvesSquares(betName, displayData) {
        return (
            <Halves
                key={betName}
                id={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
            />
        );
    }

    render() {
        return (
            <div className="game-board">
                {bettingSquares1To36Names.map((betName) => this.render1To36Squares(betName, BETTING_SQUARES_STRAIGHT_UP_1_36[betName]))}
                {bettingSquareStraightUpZeroesNames.map((betName) => this.renderZeroesSquares(betName, BETTING_SQUARES_STRAIGHT_UP_ZEROES[betName]))}
                {bettingSquareRowsNames.map((betName) => this.renderRowsSquares(betName, BETTING_SQUARES_ROWS[betName]))}
                {bettingSquareDozensNames.map((betName) => this.renderDozensSquares(betName, BETTING_SQUARES_DOZENS[betName]))}
                {bettingSquareHalvesNames.map((betName) => this.renderHalvesSquares(betName, BETTING_SQUARES_HALVES[betName]))}
            </div>
        );
    }
}
