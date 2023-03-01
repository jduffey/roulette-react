import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    REWARDS_ADDRESS
} from "../../common/blockchainWrapper";

const CLASS_NAME = "RewardsInfo-component";
export function RewardsInfo(props) {
    const [rewardsBalance, setRewardsBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const balance = await getTokenBalance(REWARDS_ADDRESS);
            setRewardsBalance(balance);
        }, 100);

    }, [props]);

    const accumulatedRewardsText = rewardsBalance ? `$ ${Number(rewardsBalance).toFixed(2)}` : "Loading...";
    const gamesWon = props.transactionHistory.filter(tx => tx.finalBalance > tx.startingBalance).length;
    const gamesLost = props.transactionHistory.filter(tx => tx.finalBalance < tx.startingBalance).length;
    const gamesTied = props.transactionHistory.filter(tx => tx.finalBalance === tx.startingBalance).length;


    console.log("props.gamesPlayed", props.gamesPlayed);
    const gamesPlayedText = typeof props.gamesPlayed === "number"
        ? props.gamesPlayed
        : "Loading...";

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"Games Played"}
                < br />
                <span className="rewards-info-value">
                    {gamesPlayedText}
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
            <div>
                Games Tied
                <br />
                {gamesTied}
            </div>
        </div >
    )
}
