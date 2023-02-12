import React from 'react';

import { ClickableSicBoBet, BET_OPTION_DISPLAY_PARAMS } from './ClickableSicBoBet';

export function Board(props) {
    return (
        <div>
            {Object.entries(BET_OPTION_DISPLAY_PARAMS).map(([betName, params]) => {
                return (
                    <ClickableSicBoBet
                        key={betName}
                        onClick={() => props.onClick(betName)}
                        displayText={params.displayText}
                        styleData={params.styleData}
                    />
                );
            })}
        </div>
    );
}
