import React from 'react';

import { BetsOnBoard } from './BetsOnBoard';
import { PlayerInfo } from './PlayerInfo';

export function GameInfo(props) {
    const betsOnBoard = createBetsOnBoard(props.betsOnBoard);
    const totalBetAmount = calculateTotalBetAmount(props.betsOnBoard);

    return (
        <div className="game-info">
            <BetsOnBoard
                buttons={betsOnBoard}
            />
            <PlayerInfo
                playerBalance={props.playerBalance}
                totalBetAmount={totalBetAmount}
            />
        </div>
    );
}

function calculateTotalBetAmount(betsOnBoard) {
    return Object.values(betsOnBoard).reduce((total, betAmount) => total + betAmount, 0);
}

function createBetsOnBoard(betsOnBoard) {
    return Object.keys(betsOnBoard).map((bettingSquare) => {
        const desc = `${bettingSquare}: $${betsOnBoard[bettingSquare].toLocaleString()}`;

        return (
            <li key={bettingSquare}>
                {desc}
            </li>
        );
    });
}
