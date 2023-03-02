import { useEffect, useState } from "react";

import {
    getEthBalance,
    getBlock,
    getTokenBalance,
    tokenSymbol,
    // getPlayerSpins, // TODO display this as well
    getPlayerRewards,
    FIRST_PLAYER_ADDRESS,
    SECOND_PLAYER_ADDRESS,
    THIRD_PLAYER_ADDRESS,
    HOUSE_ADDRESS,
    TOKEN_CONTRACT_ADDRESS,
    ROULETTE_CONTRACT_ADDRESS,
} from "../../common/blockchainWrapper";

export function Balances() {
    const [ethBalances, setEthBalances] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([]);
    const [playerRewards, setPlayerRewards] = useState([]);

    const [block, setBlock] = useState({});

    const NICKNAMES = {
        [FIRST_PLAYER_ADDRESS]: "Player 1 👤",
        [SECOND_PLAYER_ADDRESS]: "Player 2 👤",
        [THIRD_PLAYER_ADDRESS]: "Player 3 👤",
        [HOUSE_ADDRESS]: "House 🏠",
        [TOKEN_CONTRACT_ADDRESS]: "Token 📜",
        [ROULETTE_CONTRACT_ADDRESS]: "Roulette 🎰",
    }

    const MS_REFRESH_INTERVAL = 1000;

    useEffect(() => {
        const interval = setInterval(() => {
            const addressesInDisplayOrder = [
                FIRST_PLAYER_ADDRESS,
                SECOND_PLAYER_ADDRESS,
                THIRD_PLAYER_ADDRESS,
                HOUSE_ADDRESS,
                TOKEN_CONTRACT_ADDRESS,
                ROULETTE_CONTRACT_ADDRESS,
            ];

            const addressWithBalancePromises = addressesInDisplayOrder.map(async (address) => {
                const balance = await getEthBalance(address);
                return { address, balance };
            });

            Promise.all(addressWithBalancePromises).then((res) => {
                const newBalances = res.reduce((acc, cur) => {
                    acc[cur.address] = cur.balance;
                    return acc;
                }, {});
                setEthBalances(newBalances);
            });

            const addressesWithTokenBalancePromises = addressesInDisplayOrder.map(async (address) => {
                const balance = await getTokenBalance(address);
                return { address, balance };
            });

            Promise.all(addressesWithTokenBalancePromises).then((res) => {
                const newBalances = res.reduce((acc, cur) => {
                    acc[cur.address] = cur.balance;
                    return acc;
                }, {});
                setTokenBalances(newBalances);
            });

            const addressesWithRewardsPromises = addressesInDisplayOrder.map(async (address) => {
                const balance = await getPlayerRewards(address);
                return { address, balance };
            });

            Promise.all(addressesWithRewardsPromises).then((res) => {
                const newBalances = res.reduce((acc, cur) => {
                    acc[cur.address] = cur.balance;
                    return acc;
                }, {});
                setPlayerRewards(newBalances);
            });

            getBlock()
                .then((blockData) => {
                    setBlock(blockData);
                });
        }, MS_REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const combinedBalances = Object.keys(ethBalances).reduce((acc, address) => {
        acc[address] = {
            ethBalance: ethBalances[address],
            tokenBalance: tokenBalances[address],
            rewards: playerRewards[address],
        };
        return acc;
    }, {});

    const columnNamesAndWidths = {
        "Nickname": "15%",
        "Address": "15%",
        "ETH Balance": "20%",
        "GAME Balance": "15%",
        "Rewards": "10%",
    }

    return (
        <div
            className="Balances-component"
        >
            <div>
                {
                    ["hash", "number", "timestamp"].map((key) => {
                        return (
                            <div key={key}>
                                {`${key}: ${block[key]}`}
                            </div>
                        );
                    })
                }
            </div>
            <div>
                <table
                    className="balances-table">
                    <thead>
                        <tr className="balances-table-headers">
                            <th style={{ width: columnNamesAndWidths["Nickname"] }}>Nickname</th>
                            <th style={{ width: columnNamesAndWidths["Address"] }}>Address</th>
                            <th style={{ width: columnNamesAndWidths["ETH Balance"] }}>ETH Balance</th>
                            <th style={{ width: columnNamesAndWidths["GAME Balance"] }}>{tokenSymbol} Balance</th>
                            <th style={{ width: columnNamesAndWidths["Rewards"] }}>Rewards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(combinedBalances).map(([addr, { ethBalance, tokenBalance, rewards }]) => {
                                return (
                                    <tr key={addr}>
                                        <td>{NICKNAMES[addr]}</td>
                                        <td>
                                            {`${addr.slice(0, 5)}..${addr.slice(-3)}`}
                                        </td>
                                        <td>
                                            {Number(ethBalance).toLocaleString(undefined, {
                                                minimumFractionDigits: 8,
                                                maximumFractionDigits: 8
                                            })}
                                        </td>
                                        <td>
                                            {Number(tokenBalance).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </td>
                                        <td>
                                            {Number(rewards).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
