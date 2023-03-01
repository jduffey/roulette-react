import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    HOUSE_ADDRESS
} from "../../common/blockchainWrapper";

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo(props) {
    const [houseBalance, setHouseBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const houseTokenBalance = await getTokenBalance(HOUSE_ADDRESS);
            setHouseBalance(houseTokenBalance);
        }, 100);

    }, [props.transactionHistory]);

    const houseBalanceText = houseBalance
        ? `$ ${parseFloat(houseBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
        </div >
    )
}