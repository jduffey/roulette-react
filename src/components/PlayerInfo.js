import React from 'react';

const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"Avail. Balance"}
                < br />
                {`$ ${props.availableBalance.toLocaleString()}`}
            </div>
            <div>
                {"Total Bet"}
                < br />
                {`$ ${props.totalBetAmount.toLocaleString()}`}
            </div>
            <div
                id="reset-history"
                onClick={() => props.onClick()}
            >
                RESET HISTORY
            </div>
        </div >
    )
}
