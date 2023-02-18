import { useEffect, useState } from "react";

import {
    getTokenBalance,
    FIRST_PLAYER_ADDRESS,
} from '../../common/blockchainWrapper';

import { ethers } from "ethers";

const wsProvider = new ethers.providers.WebSocketProvider("ws://localhost:8545");

console.log("wsProvider:", wsProvider);

const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    const [tokenBalance, setTokenBalance] = useState("Not loaded...");

    // Adapted from https://github.com/ethers-io/ethers.js/issues/1053#issuecomment-808736570
    const EXPECTED_PONG_BACK = 2000
    const KEEP_ALIVE_CHECK_INTERVAL = 1000

    let startCounter = 1;
    const startConnection = () => {
        if (typeof wsProvider._websocket === "undefined") {
            console.log("Websocket connection is undefined. Is the blockchain node running?");
            return;
        }

        // TODO why does this counter always make it to 2 (twice)?
        console.log(`Websocket connection started ${startCounter++} time(s).`);

        wsProvider._websocket.onmessage = (event) => {
            console.log("An event was received:", event);
        }

        let pingTimeout = null
        let keepAliveInterval = null
        wsProvider._websocket.onopen = () => {
            console.log("onopen");
            keepAliveInterval = setInterval(() => {
                console.log("Running the interval", Date.now());
                (async (addr) => {
                    console.log("Getting token balance", Date.now());
                    const balance = await getTokenBalance(addr);
                    const balanceAsNumber = Number(balance);
                    setTokenBalance(balanceAsNumber);
                })(FIRST_PLAYER_ADDRESS);
                pingTimeout = setTimeout(() => {
                    console.log("setting what happens if the ping times out", Date.now());
                    wsProvider._websocket.close();
                }, EXPECTED_PONG_BACK)
            }, KEEP_ALIVE_CHECK_INTERVAL)
        }

        wsProvider._websocket.onclose = () => {
            console.log("onclose");
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
