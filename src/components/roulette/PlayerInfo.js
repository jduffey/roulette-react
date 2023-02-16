import { useEffect, useState } from "react";

import {
    getTokenBalance,
} from '../../common/blockchainWrapper';

const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    const [tokenBalance, setTokenBalance] = useState(0);

    useEffect(() => {
        (async (addr) => {
            const balance = await getTokenBalance(addr);
            const balanceAsNumber = Number(balance);
            setTokenBalance(balanceAsNumber);
        })("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    }, [tokenBalance]);

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"Tok. Balance"}
                < br />
                {tokenBalance.toLocaleString()}
            </div>
            <div>
                {"Avail. Balance"}
                < br />
                {`$ ${props.availableBalance.toLocaleString()}`}
            </div>
            <div>
                {"Total Bet"}
                < br />
                {`$ ${props.totalBetAmount.toLocaleString()}`}
            </div>
            <div
                id="reset-history"
                onClick={() => props.onClick()}
            >
                RESET HISTORY
            </div>
        </div >
    )
}
