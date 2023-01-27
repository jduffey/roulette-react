import React from 'react';

import { BetOption } from './BetOption';

import { BET_OPTION_PARAMS } from './betOptionParameters';

const CLASS_NAME = "Board-component";
export function Board(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            {Object.entries(BET_OPTION_PARAMS).map(([betOptionName, params]) => {
                return (
                    <BetOption
                        textLabelClassNamePrefix={params.textLabelClassNamePrefix}
                        key={betOptionName}
                        onClick={() => props.onClick(betOptionName)}
                        displayText={params.displayText}
                        betAmount={props.betsOnBoard[betOptionName]}
                        styleData={params.styleData}
                    />
                );
            })}
        </div>
    );
}
