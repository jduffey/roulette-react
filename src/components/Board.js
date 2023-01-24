import React from 'react';

import { BetOption } from './BetOption';

import {
    bettingSquares1To36Names,
    bettingSquareStraightUpZeroesNames,
    bettingSquareDozensNames,
    bettingSquareColumnNames,
    bettingSquareHalvesNames,
    BETTING_SQUARES_STRAIGHT_UP_1_36,
    BETTING_SQUARES_STRAIGHT_UP_ZEROES,
    BETTING_SQUARES_DOZENS,
    BETTING_SQUARES_COLUMNS,
    BETTING_SQUARES_HALVES,
} from './betOptionParameters';

export function Board(props) {
    function render1To36Squares(betName, displayData) {
        displayData.styleData.width = 80;
        displayData.styleData.height = 120;
        return (
            <BetOption
                key={betName}
                onClick={() => props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="straightUp1to36"
            />
        );
    }

    function renderZeroesSquares(betName, displayData) {
        displayData.styleData.width = 80;
        displayData.styleData.height = 180;
        return (
            <BetOption
                key={betName}
                onClick={() => props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="zero"
            />
        );
    }

    function renderDozensSquares(betName, displayData) {
        displayData.styleData.width = 320;
        displayData.styleData.height = 80;
        return (
            <BetOption
                key={betName}
                onClick={() => props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="dozens"
            />
        );
    }

    function renderColumnSquares(betName, displayData) {
        displayData.styleData.width = 80;
        displayData.styleData.height = 120;
        return (
            <BetOption
                key={betName}
                onClick={() => props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="column"
            />
        );
    }

    function renderHalvesSquares(betName, displayData) {
        displayData.styleData.width = 160;
        displayData.styleData.height = 80;
        return (
            <BetOption
                key={betName}
                id={betName}
                onClick={() => props.onClick(betName)}
                displayLabel={displayData.displayText}
                betAmount={props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix="halves"
            />
        );
    }

    return (
        <div className="game-board">
            {bettingSquares1To36Names.map((betName) => render1To36Squares(betName, BETTING_SQUARES_STRAIGHT_UP_1_36[betName]))}
            {bettingSquareStraightUpZeroesNames.map((betName) => renderZeroesSquares(betName, BETTING_SQUARES_STRAIGHT_UP_ZEROES[betName]))}
            {bettingSquareColumnNames.map((betName) => renderColumnSquares(betName, BETTING_SQUARES_COLUMNS[betName]))}
            {bettingSquareDozensNames.map((betName) => renderDozensSquares(betName, BETTING_SQUARES_DOZENS[betName]))}
            {bettingSquareHalvesNames.map((betName) => renderHalvesSquares(betName, BETTING_SQUARES_HALVES[betName]))}
        </div>
    );
}
