import React from 'react';

import { ClickableBet, DISPLAY_PARAMS } from './ClickableBet';

const CLASS_NAME = "Board-component";
export function Board(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            {Object.entries(DISPLAY_PARAMS).map(([betName, params]) => {
                return (
                    <ClickableBet
                        id={betName}
                        textLabelClassNamePrefix={params.textLabelClassNamePrefix}
                        key={betName}
                        onClick={() => props.onClick(betName)}
                        displayText={params.displayText}
                        betAmount={props.pendingBets.filter(pendingBet => pendingBet.betName === betName).reduce((acc, pendingBet) => acc + pendingBet.betAmount, 0)}
                        styleData={params.styleData}
                    />
                );
            })}
        </div>
    );
}
