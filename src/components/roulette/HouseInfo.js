import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    REWARDS_ADDRESS
} from "../../common/blockchainWrapper";

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo(props) {
    const [rewardsBalance, setRewardsBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const balance = await getTokenBalance(REWARDS_ADDRESS);
            setRewardsBalance(balance);
        }, 100);

    }, [props]);

    const houseBalanceText = props.houseBalance
        ? `⛓ ${parseFloat(props.houseBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "Loading...";

    const accumulatedRewardsText = rewardsBalance
        ? `⛓ ${Number(rewardsBalance).toFixed(2)}`
        : "Loading...";

    const gamesPlayedText = typeof props.gamesPlayed === "number"
        ? `⛓ ${props.gamesPlayed}`
        : "Loading...";

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"House Balance"}
                < br />
                <span className="rewards-info-value">
                    {houseBalanceText}
                </span>
            </div>
            <br />
            <div>
                {"Rewards"}
                < br />
                <span className="rewards-info-value">
                    {accumulatedRewardsText}
                </span>
            </div>
            <br />
            <div>
                {"Games Played"}
                < br />
                <span className="rewards-info-value">
                    {gamesPlayedText}
                </span>
            </div>
        </div >
    )
}
