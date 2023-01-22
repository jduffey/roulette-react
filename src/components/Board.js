import React from 'react';

import { StraightUp1To36 } from './BettingOptions/StraightUp1To36';
import { StraightUpZeroes } from './BettingOptions/StraightUpZeroes';
import { Dozens } from './BettingOptions/Dozens';
import { Column } from './BettingOptions/Column';
import { Halves } from './BettingOptions/Halves';

import { BET_NAMES } from '../common/betNames';

const convertBettingSquareDataToObject = (bettingSquareData) => {
    return bettingSquareData.reduce((acc, next) => {
        return {
            ...acc, // TODO does this really need to be destructured?
            [next[0]]: // bet name
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
    // 1st Column
    [BET_NAMES.STRAIGHT_UP_1, 80, 240, "#d94848", "1"],
    [BET_NAMES.STRAIGHT_UP_4, 160, 240, "#222222", "4"],
    [BET_NAMES.STRAIGHT_UP_7, 240, 240, "#d94848", "7"],
    [BET_NAMES.STRAIGHT_UP_10, 320, 240, "#222222", "10"],
    [BET_NAMES.STRAIGHT_UP_13, 400, 240, "#222222", "13"],
    [BET_NAMES.STRAIGHT_UP_16, 480, 240, "#d94848", "16"],
    [BET_NAMES.STRAIGHT_UP_19, 560, 240, "#d94848", "19"],
    [BET_NAMES.STRAIGHT_UP_22, 640, 240, "#222222", "22"],
    [BET_NAMES.STRAIGHT_UP_25, 720, 240, "#d94848", "25"],
    [BET_NAMES.STRAIGHT_UP_28, 800, 240, "#222222", "28"],
    [BET_NAMES.STRAIGHT_UP_31, 880, 240, "#222222", "31"],
    [BET_NAMES.STRAIGHT_UP_34, 960, 240, "#d94848", "34"],

    // 2nd Column
    [BET_NAMES.STRAIGHT_UP_2, 80, 120, "#222222", "2"],
    [BET_NAMES.STRAIGHT_UP_5, 160, 120, "#d94848", "5"],
    [BET_NAMES.STRAIGHT_UP_8, 240, 120, "#222222", "8"],
    [BET_NAMES.STRAIGHT_UP_11, 320, 120, "#222222", "11"],
    [BET_NAMES.STRAIGHT_UP_14, 400, 120, "#d94848", "14"],
    [BET_NAMES.STRAIGHT_UP_17, 480, 120, "#222222", "17"],
    [BET_NAMES.STRAIGHT_UP_20, 560, 120, "#222222", "20"],
    [BET_NAMES.STRAIGHT_UP_23, 640, 120, "#d94848", "23"],
    [BET_NAMES.STRAIGHT_UP_26, 720, 120, "#222222", "26"],
    [BET_NAMES.STRAIGHT_UP_29, 800, 120, "#222222", "29"],
    [BET_NAMES.STRAIGHT_UP_32, 880, 120, "#d94848", "32"],
    [BET_NAMES.STRAIGHT_UP_35, 960, 120, "#222222", "35"],

    // 3rd Column
    [BET_NAMES.STRAIGHT_UP_3, 80, 0, "#d94848", "3"],
    [BET_NAMES.STRAIGHT_UP_6, 160, 0, "#222222", "6"],
    [BET_NAMES.STRAIGHT_UP_9, 240, 0, "#d94848", "9"],
    [BET_NAMES.STRAIGHT_UP_12, 320, 0, "#d94848", "12"],
    [BET_NAMES.STRAIGHT_UP_15, 400, 0, "#222222", "15"],
    [BET_NAMES.STRAIGHT_UP_18, 480, 0, "#d94848", "18"],
    [BET_NAMES.STRAIGHT_UP_21, 560, 0, "#d94848", "21"],
    [BET_NAMES.STRAIGHT_UP_24, 640, 0, "#222222", "24"],
    [BET_NAMES.STRAIGHT_UP_27, 720, 0, "#d94848", "27"],
    [BET_NAMES.STRAIGHT_UP_30, 800, 0, "#d94848", "30"],
    [BET_NAMES.STRAIGHT_UP_33, 880, 0, "#222222", "33"],
    [BET_NAMES.STRAIGHT_UP_36, 960, 0, "#d94848", "36"],
]);

const BETTING_SQUARES_STRAIGHT_UP_ZEROES = convertBettingSquareDataToObject([
    [BET_NAMES.STRAIGHT_UP_0, 0, 180, "#016D29", "0"],
    [BET_NAMES.STRAIGHT_UP_00, 0, 0, "#016D29", "00"],
]);

const BETTING_SQUARES_DOZENS = convertBettingSquareDataToObject([
    [BET_NAMES.FIRST_DOZEN, 80, 360, "#016D29", "1st 12"],
    [BET_NAMES.SECOND_DOZEN, 400, 360, "#016D29", "2nd 12"],
    [BET_NAMES.THIRD_DOZEN, 720, 360, "#016D29", "3rd 12"],
]);

const BETTING_SQUARES_COLUMNS = convertBettingSquareDataToObject([
    [BET_NAMES.FIRST_COLUMN, 1040, 240, "#016D29", "2 to 1"],
    [BET_NAMES.SECOND_COLUMN, 1040, 120, "#016D29", "2 to 1"],
    [BET_NAMES.THIRD_COLUMN, 1040, 0, "#016D29", "2 to 1"],
]);

const BETTING_SQUARES_HALVES = convertBettingSquareDataToObject([
    [BET_NAMES.FIRST_18, 80, 440, "#016D29", "1 to 18"],
    [BET_NAMES.EVEN, 240, 440, "#016D29", "Even"],
    [BET_NAMES.RED, 400, 440, "#d94848", "Red"],
    [BET_NAMES.BLACK, 560, 440, "#222222", "Black"],
    [BET_NAMES.ODD, 720, 440, "#016D29", "Odd"],
    [BET_NAMES.SECOND_18, 880, 440, "#016D29", "19 to 36"],
]);

const bettingSquares1To36Names = Object.keys(BETTING_SQUARES_STRAIGHT_UP_1_36);
const bettingSquareStraightUpZeroesNames = Object.keys(BETTING_SQUARES_STRAIGHT_UP_ZEROES);
const bettingSquareDozensNames = Object.keys(BETTING_SQUARES_DOZENS);
const bettingSquareColumnNames = Object.keys(BETTING_SQUARES_COLUMNS);
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

    renderColumnSquares(betName, displayData) {
        return (
            <Column
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
                {bettingSquareColumnNames.map((betName) => this.renderColumnSquares(betName, BETTING_SQUARES_COLUMNS[betName]))}
                {bettingSquareDozensNames.map((betName) => this.renderDozensSquares(betName, BETTING_SQUARES_DOZENS[betName]))}
                {bettingSquareHalvesNames.map((betName) => this.renderHalvesSquares(betName, BETTING_SQUARES_HALVES[betName]))}
            </div>
        );
    }
}
