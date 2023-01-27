import React from 'react';

const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            {"Avail. Balance"}
            < br />
            {`$ ${props.availableBalance.toLocaleString()}`}
            <br />
            <br />
            {"Total Bet"}
            <br />
            {`$ ${props.totalBetAmount.toLocaleString()}`}
        </div >
    )
}
