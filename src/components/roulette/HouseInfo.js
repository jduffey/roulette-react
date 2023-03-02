import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    JACKPOT_ADDRESS,
} from "../../common/blockchainWrapper";

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo(props) {
    const [jackpotBalance, setJackpotBalance] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const balance = await getTokenBalance(JACKPOT_ADDRESS);
            setJackpotBalance(balance);
        }, 100);

    }, [props]);

    const houseBalanceText = props.houseBalance
        ? parseFloat(props.houseBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : "Loading...";

    const jackpotBalanceText = jackpotBalance
        ? Number(jackpotBalance).toFixed(2)
        : "Loading...";

    const totalSpinsText = typeof props.totalSpins === "number"
        ? props.totalSpins
        : "Loading...";

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                House Balance
                < br />
                {houseBalanceText}
            </div>
            <br />
            <div>
                Jackpot Balance
                < br />
                {jackpotBalanceText}
            </div>
            <br />
            <div>
                All-Time Total Spins
                < br />
                {totalSpinsText}
            </div>
        </div >
    )
}
