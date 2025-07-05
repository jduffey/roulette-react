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

    const refreshHouseBalance = async () => {
        try {
            const houseBal = await getTokenBalance(HOUSE_ADDRESS);
            setHouseBalance(houseBal);
        } catch (error) {
            console.error('Error refreshing house balance:', error);
        }
    };

    useEffect(() => {
        // Initial load with a small delay to ensure contracts are ready
        const timer = setTimeout(refreshHouseBalance, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Refresh house balance when block number changes (indicating new transactions)
    useEffect(() => {
        if (props.latestBlockNumber > 0) {
            refreshHouseBalance();
        }
    }, [props.latestBlockNumber]);

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
