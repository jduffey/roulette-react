import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    getTotalSpins,
    getTotalAmountWagered,
    HOUSE_ADDRESS,
    getRewardsPoolBalance,
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
    const [totalSpins, setTotalSpins] = useState(undefined);
    const [totalAmountWagered, setTotalAmountWagered] = useState(undefined);
    const [totalRewardsPool, setTotalRewardsPool] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const houseBal = await getTokenBalance(HOUSE_ADDRESS);
            setHouseBalance(houseBal);

            const spins = await getTotalSpins();
            setTotalSpins(spins);

            const taw = await getTotalAmountWagered();
            setTotalAmountWagered(taw);

            const totalRewards = await getRewardsPoolBalance();
            setTotalRewardsPool(totalRewards);
        }, 1000);

    }, [totalSpins]);

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
            <div>
                Rewards Pool
                < br />
                {formattedChainNumber(totalRewardsPool, 3)}
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
