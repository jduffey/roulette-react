import React from 'react';

import { BetOption } from './BetOption';

import { BET_OPTION_PARAMS } from './betOptionParameters';

export function Board(props) {
    return (
        <div className="game-board">
            {Object.entries(BET_OPTION_PARAMS).map(([betOptionName, params]) => {
                return (
                    <BetOption
                        key={betOptionName}
                        onClick={() => props.onClick(betOptionName)}
                        displayText={params.displayText}
                        betAmount={props.betsOnBoard[betOptionName]}
                        styleData={params.styleData}
                        classNamePrefix={params.classNamePrefix}
                    />
                );
            })}
        </div>
    );
}
