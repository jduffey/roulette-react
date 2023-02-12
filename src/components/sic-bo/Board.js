import React from 'react';

import { BetOption, BET_OPTION_DISPLAY_PARAMS } from './BetOption';

export function Board(props) {
    return (
        <div>
            {Object.entries(BET_OPTION_DISPLAY_PARAMS).map(([betOptionName, params]) => {
                return (
                    <BetOption
                        key={betOptionName}
                        displayText={params.displayText}
                        styleData={params.styleData}
                    />
                );
            })}
        </div>
    );
}
