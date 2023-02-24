import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    REWARDS_ADDRESS
} from "../../common/blockchainWrapper";

const CLASS_NAME = "RewardsInfo-component";
export function RewardsInfo(props) {
    const [rewardsBalance, setRewardsBalance] = useState(0);

    const gamesPlayed = props.transactionHistory.length;

    useEffect(() => {
        setTimeout(async () => {
            const balance = await getTokenBalance(REWARDS_ADDRESS);
            setRewardsBalance(balance);
        }, 100);

    }, [props.transactionHistory]);

    const accumulatedRewardsText = `$ ${Number(rewardsBalance).toFixed(2)}`;
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
                    {accumulatedRewardsText}
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
