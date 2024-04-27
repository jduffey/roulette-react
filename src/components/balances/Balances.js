import { useEffect, useState } from "react";

import {
    getEthBalance,
    getBlock,
    getTokenBalance,
    getPlayerAllowance,
    tokenSymbol,
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
    const [playerAllowances, setPlayerAllowances] = useState([]);
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

            const addressesWithAllowancePromises = addressesInDisplayOrder.map(async (address) => {
                const allowance = await getPlayerAllowance(address);
                return { address, allowance };
            });

            Promise.all(addressesWithAllowancePromises).then((res) => {
                const newAllowances = res.reduce((acc, cur) => {
                    acc[cur.address] = cur.allowance;
                    return acc;
                }, {});
                setPlayerAllowances(newAllowances);
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
            tokenAllowance: playerAllowances[address],
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
        tokenAllowance: "16%",
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
                            <th style={{ width: columnNamesAndWidths.tokenBalance }}>{tokenSymbol ?? "Token"} Balance</th>
                            <th style={{ width: columnNamesAndWidths.tokenAllowance }}>{tokenSymbol ?? "Token"} Allowance</th>
                            <th style={{ width: columnNamesAndWidths.numberCompletionSetsCounter }}>✅ Sets</th>
                            <th style={{ width: columnNamesAndWidths.numberCompletionSetCurrent }}>Current Set</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(combinedBalances).map((
                                [
                                    addr,
                                    {
                                        ethBalance,
                                        tokenBalance,
                                        tokenAllowance,
                                        numberCompletionSetsCounter,
                                        numberCompletionSetCurrent
                                    },
                                ]
                            ) => {
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
                                                minimumFractionDigits: 4,
                                                maximumFractionDigits: 4
                                            })}
                                        </td>
                                        <td>
                                            {Number(tokenAllowance).toLocaleString(undefined, {
                                                minimumFractionDigits: 4,
                                                maximumFractionDigits: 4
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
