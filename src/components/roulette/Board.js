import React from 'react';

import { ClickableBet, DISPLAY_PARAMS } from './ClickableBet';

const CLASS_NAME = "Board-component";
export function Board(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            {Object.entries(DISPLAY_PARAMS).map(([betOptionName, params]) => {
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
