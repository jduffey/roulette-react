import React from 'react';

import { ClickableBet } from './ClickableBet';

import { BET_OPTION_DISPLAY_PARAMS } from './betOptionDisplayParameters';

const CLASS_NAME = "Board-component";
export function Board(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            {Object.entries(BET_OPTION_DISPLAY_PARAMS).map(([betOptionName, params]) => {
                return (
                    <ClickableBet
                        textLabelClassNamePrefix={params.textLabelClassNamePrefix}
                        key={betOptionName}
                        onClick={() => props.onClick(betOptionName)}
                        displayText={params.displayText}
                        betAmount={props.pendingBets.filter(pendingBet => pendingBet.betName === betOptionName).reduce((acc, pendingBet) => acc + pendingBet.betAmount, 0)}
                        styleData={params.styleData}
                    />
                );
            })}
        </div>
    );
}
