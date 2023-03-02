import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    getTotalSpins,
    HOUSE_ADDRESS,
    getJackpotBalance,
} from "../../common/blockchainWrapper";

const formattedChainNumber = (chainNumber) => {
    return chainNumber
        ? parseFloat(chainNumber).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : "Loading...";
}

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo() {
    const [houseBalance, setHouseBalance] = useState(undefined);
    const [totalSpins, setTotalSpins] = useState(undefined);

    const [jackpotBalance, setJackpotBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const houseBal = await getTokenBalance(HOUSE_ADDRESS);
            setHouseBalance(houseBal);

            const spins = await getTotalSpins();
            setTotalSpins(spins);

            const jackpotBal = await getJackpotBalance();
            setJackpotBalance(jackpotBal);
        }, 1000);

    }, [totalSpins]);

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                House Balance
                < br />
                {formattedChainNumber(houseBalance)}
            </div>
            <br />
            <div>
                Jackpot Balance
                < br />
                {formattedChainNumber(jackpotBalance)}
            </div>
            <br />
            <div>
                All-Time Total Spins
                < br />
                {formattedChainNumber(totalSpins)}
            </div>
        </div >
    )
}
