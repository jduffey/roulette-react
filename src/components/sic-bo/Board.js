import React from 'react';

import { BetOption } from './BetOption';

import { BET_OPTION_PARAMS } from './betOptionParameters';

export function Board(props) {
    return (
        <div>
            {Object.entries(BET_OPTION_PARAMS).map(([betOptionName, params]) => {
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
