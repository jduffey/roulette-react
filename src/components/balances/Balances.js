import { useEffect, useState } from "react";

import {
    getEthBalance,
    getBlock,
    getTokenBalance,
    tokenSymbol,
    getPlayerSpins,
    getPlayerRewards,
    getPlayerNumberCompletionSetsCounter,
    getPlayerNumberCompletionSetCurrent,
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
    const [playerSpins, setPlayerSpins] = useState([]);
    const [playerNumberCompletionSetsCounter, setPlayerNumberCompletionSetsCounter] = useState([]);
    const [playerNumberCompletionSetCurrent, setPlayerNumberCompletionSetCurrent] = useState([]);

    const [block, setBlock] = useState({});

    const NICKNAMES = {
        [FIRST_PLAYER_ADDRESS]: "Player 1 👤",
        [SECOND_PLAYER_ADDRESS]: "Player 2 👤",
        [THIRD_PLAYER_ADDRESS]: "Player 3 👤",
        [HOUSE_ADDRESS]: "House 🏠",
        [TOKEN_CONTRACT_ADDRESS]: "Token 📜",
        [ROULETTE_CONTRACT_ADDRESS]: "Roulette 🎰",
    }

    const MS_REFRESH_INTERVAL = 2000;

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

            const addressesWithSpinsPromises = addressesInDisplayOrder.map(async (address) => {
                const count = await getPlayerSpins(address);
                return { address, count };
            });

            Promise.all(addressesWithSpinsPromises).then((res) => {
                const counts = res.reduce((acc, cur) => {
                    acc[cur.address] = cur.count;
                    return acc;
                }, {});
                setPlayerSpins(counts);
            });

            const addressesWithNumberCompletionSetsCounterPromises = addressesInDisplayOrder.map(async (address) => {
                const count = await getPlayerNumberCompletionSetsCounter(address);
                return { address, count };
            });

            Promise.all(addressesWithNumberCompletionSetsCounterPromises).then((res) => {
                const counts = res.reduce((acc, cur) => {
                    acc[cur.address] = cur.count;
                    return acc;
                }, {});
                setPlayerNumberCompletionSetsCounter(counts);
            });

            const addressesWithCompletionsSetCurrentPromises = addressesInDisplayOrder.map(async (address) => {
                const currentSet = await getPlayerNumberCompletionSetCurrent(address);
                return { address, currentSet };
            });

            Promise.all(addressesWithCompletionsSetCurrentPromises).then((res) => {
                const currentSets = res.reduce((acc, cur) => {
                    acc[cur.address] = cur.currentSet;
                    return acc;
                }, {});
                setPlayerNumberCompletionSetCurrent(currentSets);
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
            spins: playerSpins[address],
            numberCompletionSetsCounter: playerNumberCompletionSetsCounter[address],
            numberCompletionSetCurrent: playerNumberCompletionSetCurrent[address],
        };
        return acc;
    }, {});

    const columnNamesAndWidths = {
        nickname: "16%",
        address: "16%",
        ethBalance: "16%",
        tokenBalance: "16%",
        rewards: "16%",
        spins: "10%",
        numberCompletionSetsCounter: "10%",
        numberCompletionSetCurrent: "16%",
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
                            <th style={{ width: columnNamesAndWidths.nickname }}>Nickname</th>
                            <th style={{ width: columnNamesAndWidths.address }}>Address</th>
                            <th style={{ width: columnNamesAndWidths.ethBalance }}>ETH Balance</th>
                            <th style={{ width: columnNamesAndWidths.tokenBalance }}>{tokenSymbol} Balance</th>
                            <th style={{ width: columnNamesAndWidths.rewards }}>Rewards</th>
                            <th style={{ width: columnNamesAndWidths.spins }}>Spins</th>
                            <th style={{ width: columnNamesAndWidths.numberCompletionSetsCounter }}>✅ Sets</th>
                            <th style={{ width: columnNamesAndWidths.numberCompletionSetCurrent }}>Current Set</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(combinedBalances).map(([addr, { ethBalance, tokenBalance, rewards, spins, numberCompletionSetsCounter, numberCompletionSetCurrent }]) => {
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
                                        <td>
                                            {Number(spins).toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            })}
                                        </td>
                                        <td>
                                            {Number(numberCompletionSetsCounter).toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            })}
                                        </td>
                                        <td>
                                            {typeof numberCompletionSetCurrent !== "undefined"
                                                ? numberCompletionSetCurrent.join(",")
                                                : "Empty"
                                            }
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
