import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    REWARDS_ADDRESS
} from "../../common/blockchainWrapper";

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo(props) {
    const [houseBalance, setHouseBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            // const balance = await getTokenBalance(REWARDS_ADDRESS);
            setHouseBalance("FOO");
        }, 100);

    }, [props.transactionHistory]);

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"House Balance"}
                < br />
                <span className="rewards-info-value">
                    {houseBalance}
                </span>
            </div>
        </div >
    )
}
