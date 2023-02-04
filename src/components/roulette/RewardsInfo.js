import React from 'react';

const CLASS_NAME = "RewardsInfo-component";
export function RewardsInfo(props) {
    const gamesPlayed = props.transactionHistory.length;

    const rewardsRatio = 0.01;
    const accumulatedRewards = props.transactionHistory.reduce((acc, tx) => {
        const txBetAmount = Object.values(tx.betsPlaced).reduce((acc, betAmount) => acc + betAmount, 0);
        const txRewards = txBetAmount * rewardsRatio;
        return acc + txRewards;
    }, 0);

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"Games Played"}
                < br />
                <span className="rewards-info-value">
                    {gamesPlayed}
                </span>
            </div>
            <div>
                {"Rewards"}
                < br />
                <span className="rewards-info-value">
                    {`$ ${accumulatedRewards.toFixed(2)}`}
                </span>
            </div>
        </div >
    )
}
