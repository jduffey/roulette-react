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
    function renderBetOption(betName, displayData, classNamePrefix) {
        return (
            <BetOption
                key={betName}
                onClick={() => props.onClick(betName)}
                displayText={displayData.displayText}
                betAmount={props.betsOnBoard[betName]}
                styleData={displayData.styleData}
                classNamePrefix={classNamePrefix}
            />
        );
    }

    return (
        <div className="game-board">
            {bettingSquares1To36Names.map((betName) => renderBetOption(betName, BETTING_SQUARES_STRAIGHT_UP_1_36[betName], "straightUp1to36"))}
            {bettingSquareStraightUpZeroesNames.map((betName) => renderBetOption(betName, BETTING_SQUARES_STRAIGHT_UP_ZEROES[betName], "zero"))}
            {bettingSquareColumnNames.map((betName) => renderBetOption(betName, BETTING_SQUARES_COLUMNS[betName], "column"))}
            {bettingSquareDozensNames.map((betName) => renderBetOption(betName, BETTING_SQUARES_DOZENS[betName], "dozens"))}
            {bettingSquareHalvesNames.map((betName) => renderBetOption(betName, BETTING_SQUARES_HALVES[betName], "halves"))}
        </div>
    );
}
