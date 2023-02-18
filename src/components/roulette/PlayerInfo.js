import { useState } from "react";

import {
    getTokenBalance,
    FIRST_PLAYER_ADDRESS,
} from '../../common/blockchainWrapper';

import { ethers } from "ethers";

const wsProvider = new ethers.providers.WebSocketProvider("ws://localhost:8545");

const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    const [tokenBalance, setTokenBalance] = useState("Not loaded...");

    // Adapted from https://github.com/ethers-io/ethers.js/issues/1053#issuecomment-808736570
    const EXPECTED_PONG_BACK = 1000
    const KEEP_ALIVE_CHECK_INTERVAL = 455

    const startConnection = () => {
        wsProvider._websocket.onmessage = (event) => {
            console.log("An event was received:", event);
        }

        let pingTimeout = null
        let keepAliveInterval = null
        wsProvider._websocket.onopen = () => {
            keepAliveInterval = setInterval(() => {
                (async (addr) => {
                    const balance = await getTokenBalance(addr);
                    const balanceAsNumber = Number(balance);
                    setTokenBalance(balanceAsNumber);
                })(FIRST_PLAYER_ADDRESS);
                pingTimeout = setTimeout(() => {
                    wsProvider._websocket.close();
                }, EXPECTED_PONG_BACK)
            }, KEEP_ALIVE_CHECK_INTERVAL)
        }

        wsProvider._websocket.onclose = () => {
            clearInterval(keepAliveInterval);
            clearTimeout(pingTimeout);
            startConnection();
        }
    }

    startConnection();

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
