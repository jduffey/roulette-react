import { useEffect, useState } from 'react';

import {
    getPlayerSpins,
} from "../../common/blockchainWrapper";

const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber
        ? parseFloat(chainNumber)
            .toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading...";
}

const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    const [playerSpinCount, setPlayerSpinCount] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const spins = await getPlayerSpins(props.playerAddress);
            setPlayerSpinCount(spins);
        }, 1000);

    }, [props.playerAddress, playerSpinCount]);

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                Player Balance
                < br />
                {formattedChainNumber(props.playerBalance, 2)}
            </div>
            <div>
                Current Bet
                < br />
                {props.totalBetAmount.toLocaleString()}
            </div>
            <div>
                Total Player Spins
                < br />
                {formattedChainNumber(playerSpinCount, 0)}
            </div>
        </div >
    )
}
