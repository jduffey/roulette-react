import React from 'react';

import { BetOption } from './BetOption';

import { BET_NAMES } from '../common/betNames';
import { STANDARD_COLORS } from '../common/standardColors';

const convertBettingSquareDataToObject = (bettingSquareData) => {
    return bettingSquareData.reduce((acc, next) => {
        acc[next[0]] = {
            styleData: {
                left: next[1],
                top: next[2],
                backgroundColor: next[3],
                labelBackgroundColor: next[4],
            },
            displayText: next[5],
        };
        return acc;
    }, {});
};

const BETTING_SQUARES_STRAIGHT_UP_1_36 = convertBettingSquareDataToObject([
    // 1st Column
    [BET_NAMES.STRAIGHT_UP_1, 80, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "1"],
    [BET_NAMES.STRAIGHT_UP_4, 160, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "4"],
    [BET_NAMES.STRAIGHT_UP_7, 240, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "7"],
    [BET_NAMES.STRAIGHT_UP_10, 320, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "10"],
    [BET_NAMES.STRAIGHT_UP_13, 400, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "13"],
    [BET_NAMES.STRAIGHT_UP_16, 480, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "16"],
    [BET_NAMES.STRAIGHT_UP_19, 560, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "19"],
    [BET_NAMES.STRAIGHT_UP_22, 640, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "22"],
    [BET_NAMES.STRAIGHT_UP_25, 720, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "25"],
    [BET_NAMES.STRAIGHT_UP_28, 800, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "28"],
    [BET_NAMES.STRAIGHT_UP_31, 880, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "31"],
    [BET_NAMES.STRAIGHT_UP_34, 960, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "34"],

    // 2nd Column
    [BET_NAMES.STRAIGHT_UP_2, 80, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "2"],
    [BET_NAMES.STRAIGHT_UP_5, 160, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "5"],
    [BET_NAMES.STRAIGHT_UP_8, 240, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "8"],
    [BET_NAMES.STRAIGHT_UP_11, 320, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "11"],
    [BET_NAMES.STRAIGHT_UP_14, 400, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "14"],
    [BET_NAMES.STRAIGHT_UP_17, 480, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "17"],
    [BET_NAMES.STRAIGHT_UP_20, 560, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "20"],
    [BET_NAMES.STRAIGHT_UP_23, 640, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "23"],
    [BET_NAMES.STRAIGHT_UP_26, 720, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "26"],
    [BET_NAMES.STRAIGHT_UP_29, 800, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "29"],
    [BET_NAMES.STRAIGHT_UP_32, 880, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "32"],
    [BET_NAMES.STRAIGHT_UP_35, 960, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "35"],

    // // 3rd Column
    [BET_NAMES.STRAIGHT_UP_3, 80, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "3"],
    [BET_NAMES.STRAIGHT_UP_6, 160, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "6"],
    [BET_NAMES.STRAIGHT_UP_9, 240, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "9"],
    [BET_NAMES.STRAIGHT_UP_12, 320, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "12"],
    [BET_NAMES.STRAIGHT_UP_15, 400, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "15"],
    [BET_NAMES.STRAIGHT_UP_18, 480, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "18"],
    [BET_NAMES.STRAIGHT_UP_21, 560, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "21"],
    [BET_NAMES.STRAIGHT_UP_24, 640, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "24"],
    [BET_NAMES.STRAIGHT_UP_27, 720, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "27"],
    [BET_NAMES.STRAIGHT_UP_30, 800, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "30"],
    [BET_NAMES.STRAIGHT_UP_33, 880, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_BLACK, "33"],
    [BET_NAMES.STRAIGHT_UP_36, 960, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_RED, "36"],
]);

const BETTING_SQUARES_STRAIGHT_UP_ZEROES = convertBettingSquareDataToObject([
    [BET_NAMES.STRAIGHT_UP_0, 0, 180, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_GREEN, "0"],
    [BET_NAMES.STRAIGHT_UP_00, 0, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.FELT_GREEN, "00"],
]);

const BETTING_SQUARES_DOZENS = convertBettingSquareDataToObject([
    [BET_NAMES.FIRST_DOZEN, 80, 360, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "1st 12"],
    [BET_NAMES.SECOND_DOZEN, 400, 360, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "2nd 12"],
    [BET_NAMES.THIRD_DOZEN, 720, 360, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "3rd 12"],
]);

const BETTING_SQUARES_COLUMNS = convertBettingSquareDataToObject([
    [BET_NAMES.FIRST_COLUMN, 1040, 240, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "2 to 1"],
    [BET_NAMES.SECOND_COLUMN, 1040, 120, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "2 to 1"],
    [BET_NAMES.THIRD_COLUMN, 1040, 0, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "2 to 1"],
]);

const BETTING_SQUARES_HALVES = convertBettingSquareDataToObject([
    [BET_NAMES.FIRST_18, 80, 440, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "1 to 18"],
    [BET_NAMES.EVEN, 240, 440, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "Even"],
    [BET_NAMES.RED, 400, 440, STANDARD_COLORS.FELT_RED, STANDARD_COLORS.INHERIT, "Red"],
    [BET_NAMES.BLACK, 560, 440, STANDARD_COLORS.FELT_BLACK, STANDARD_COLORS.INHERIT, "Black"],
    [BET_NAMES.ODD, 720, 440, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "Odd"],
    [BET_NAMES.SECOND_18, 880, 440, STANDARD_COLORS.INHERIT, STANDARD_COLORS.INHERIT, "19 to 36"],
]);

const bettingSquares1To36Names = Object.keys(BETTING_SQUARES_STRAIGHT_UP_1_36);
const bettingSquareStraightUpZeroesNames = Object.keys(BETTING_SQUARES_STRAIGHT_UP_ZEROES);
const bettingSquareDozensNames = Object.keys(BETTING_SQUARES_DOZENS);
const bettingSquareColumnNames = Object.keys(BETTING_SQUARES_COLUMNS);
const bettingSquareHalvesNames = Object.keys(BETTING_SQUARES_HALVES);

export class Board extends React.Component {
    render1To36Squares(betName, displayData) {
        displayData.styleData.width = 80;
        displayData.styleData.height = 120;
        return (
            <BetOption
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="straightUp1to36"
            />
        );
    }

    renderZeroesSquares(betName, displayData) {
        displayData.styleData.width = 80;
        displayData.styleData.height = 180;
        return (
            <BetOption
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="zero"
            />
        );
    }

    renderDozensSquares(betName, displayData) {
        displayData.styleData.width = 320;
        displayData.styleData.height = 80;
        return (
            <BetOption
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="dozens"
            />
        );
    }

    renderColumnSquares(betName, displayData) {
        displayData.styleData.width = 80 ;
        displayData.styleData.height = 120;
        return (
            <BetOption
                key={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="column"
            />
        );
    }

    renderHalvesSquares(betName, displayData) {
        displayData.styleData.width = 160;
        displayData.styleData.height = 80;
        return (
            <BetOption
                key={betName}
                id={betName}
                onClick={() => this.props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={this.props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="halves"
            />
        );
    }

    render() {
        return (
            <div className="game-board">
                {bettingSquares1To36Names.map((betName) => this.render1To36Squares(betName, BETTING_SQUARES_STRAIGHT_UP_1_36[betName]))}
                {bettingSquareStraightUpZeroesNames.map((betName) => this.renderZeroesSquares(betName, BETTING_SQUARES_STRAIGHT_UP_ZEROES[betName]))}
                {bettingSquareColumnNames.map((betName) => this.renderColumnSquares(betName, BETTING_SQUARES_COLUMNS[betName]))}
                {bettingSquareDozensNames.map((betName) => this.renderDozensSquares(betName, BETTING_SQUARES_DOZENS[betName]))}
                {bettingSquareHalvesNames.map((betName) => this.renderHalvesSquares(betName, BETTING_SQUARES_HALVES[betName]))}
            </div>
        );
    }
}
