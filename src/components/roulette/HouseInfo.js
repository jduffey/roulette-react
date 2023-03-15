import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    HOUSE_ADDRESS,
} from "../../common/blockchainWrapper";

const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber
        ? parseFloat(chainNumber)
            .toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading...";
}

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo(props) {
    const [houseBalance, setHouseBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const houseBal = await getTokenBalance(HOUSE_ADDRESS);
            setHouseBalance(houseBal);
        }, 1000);

    }, []);

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                Block Height
                <br />
                {props.latestBlockNumber}
            </div>
            <div>
                House Balance
                < br />
                {formattedChainNumber(houseBalance, 3)}
            </div>
        </div >
    )
}
