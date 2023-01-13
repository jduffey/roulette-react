import React from 'react';

import { BettingHistory } from './BettingHistory';
import { PlayerInfo } from './PlayerInfo';

export function GameInfo(props) {
    const bettingHistoryButtons = createBettingHistoryButtons(props.bettingHistory);

    return (
        <div className="game-info">
            {/* <BettingHistory
                buttons={bettingHistoryButtons}
            /> */}
            <PlayerInfo
                playerBalance={props.playerBalance}
                totalBetAmount={props.bettingHistory.length}
            />
        </div>
    );
}

function createBettingHistoryButtons(bettingHistory) {
    return bettingHistory.map((bettingSquare, betOrderZeroIndexed) => {
        const betOrderOneIndexed = betOrderZeroIndexed + 1;

        // const desc = `#${betOrderOneIndexed} - ${bettingSquare}`;

        return (
            <li
                key={betOrderOneIndexed}
            >
                "NAME"
                {/* <button
                    className="betting-history-button"
                >
                    {desc}
                </button> */}
            </li>
        );
    });
}
