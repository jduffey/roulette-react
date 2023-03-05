import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    getTotalSpins,
    getTotalAmountWagered,
    HOUSE_ADDRESS,
    getJackpotBalance,
} from "../../common/blockchainWrapper";

const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber
        ? parseFloat(chainNumber)
            .toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading...";
}

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo() {
    const [houseBalance, setHouseBalance] = useState(undefined);
    const [totalSpins, setTotalSpins] = useState(undefined);
    const [totalAmountWagered, setTotalAmountWagered] = useState(undefined);
    const [jackpotBalance, setJackpotBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const houseBal = await getTokenBalance(HOUSE_ADDRESS);
            setHouseBalance(houseBal);

            const spins = await getTotalSpins();
            setTotalSpins(spins);

            const taw = await getTotalAmountWagered();
            // TODO: workaround for 2.5 decimal chips
            // a decimal (2.5) is multiplied by 10 in the blockchain wrapper
            // so that a whole number is sent to the contract
            const formattedTaw = parseFloat(taw) / 10;
            setTotalAmountWagered(formattedTaw);

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
                {formattedChainNumber(houseBalance, 3)}
            </div>
            <div>
                Jackpot Balance
                < br />
                {formattedChainNumber(jackpotBalance, 3)}
            </div>
            <div>
                Total Spins
                < br />
                {formattedChainNumber(totalSpins, 0)}
            </div>
            <div>
                Total Amount Wagered
                < br />
                {formattedChainNumber(totalAmountWagered, 2)}
            </div>
        </div >
    )
}
