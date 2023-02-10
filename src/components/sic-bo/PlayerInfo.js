import React from 'react';

const CLASS_NAME = "SicBo-PlayerInfo-component";
export function PlayerInfo() {
    const ownedBalance = 10000;
    const chipsInHand = ownedBalance;
    const totalBetsOnBoard = 0;

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"Owned Bal."}
                < br />
                {ownedBalance}
            </div>
            <div>
                {"Chips in Hand"}
                < br />
                {chipsInHand}
            </div>
            <div>
                {"Total Bet"}
                < br />
                {totalBetsOnBoard}
            </div>
        </div >
    )
}
