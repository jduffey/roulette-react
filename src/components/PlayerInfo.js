import React from 'react';

export const PlayerInfo = (props) => {
    return (
        <div className="player-info" >
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
