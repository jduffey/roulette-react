import React from 'react';

import { BettingHistory } from './BettingHistory';
import { PlayerInfo } from './PlayerInfo';

export function GameInfo(props) {
    // const bettingHistoryButtons = createBettingHistoryButtons(props.bettingHistory);
    const totalBetAmount = calculateTotalBetAmount(props.bettingHistory);

    return (
        <div className="game-info">
            {/* <BettingHistory
                buttons={bettingHistoryButtons}
            /> */}
            <PlayerInfo
                playerBalance={props.playerBalance}
                totalBetAmount={totalBetAmount}
            />
        </div>
    );
}

function calculateTotalBetAmount(bettingHistory) {
    return Object.values(bettingHistory).reduce((total, betAmount) => total + betAmount, 0);
}

// function createBettingHistoryButtons(bettingHistory) {
//     return bettingHistory.map((bettingSquare, betOrderZeroIndexed) => {
//         const betOrderOneIndexed = betOrderZeroIndexed + 1;

//         // const desc = `#${betOrderOneIndexed} - ${bettingSquare}`;

//         return (
//             <li
//                 key={betOrderOneIndexed}
//             >
//                 "NAME"
//                 {/* <button
//                     className="betting-history-button"
//                 >
//                     {desc}
//                 </button> */}
//             </li>
//         );
//     });
// }
