import React from 'react';

const CLASS_NAME = "RewardsInfo-component";
export function RewardsInfo(props) {
    const gamesPlayed = props.transactionHistory.length;

    const rewardsRatio = 0.01;
    const accumulatedRewards = props.transactionHistory.reduce((acc, tx) => {
        let txRewards = 0;
        if (tx.finalBalance < tx.startingBalance) {
            // TODO this is a bug because it uses the entire bet amount, not the amount that was lost
            // TODO update this to query the chain instead
            const txBetAmount = Object.values(tx.betsPlaced).reduce((acc, betAmount) => acc + betAmount, 0);
            txRewards = txBetAmount * rewardsRatio;
        }
        return acc + txRewards;
    }, 0);

    const gamesWon = props.transactionHistory.filter(tx => tx.finalBalance > tx.startingBalance).length;
    const gamesLost = props.transactionHistory.filter(tx => tx.finalBalance < tx.startingBalance).length;

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
            <div>
                Games Won
                <br />
                {gamesWon}
            </div>
            <div>
                Games Lost
                <br />
                {gamesLost}
            </div>
        </div >
    )
}
