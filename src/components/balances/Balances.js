import { useEffect, useState } from "react";

import {
    getEthBalance,
    getBlock,
    getTokenBalance,
    depositEthForTokens,
    redeemTokensForEth,
    transferFrom,
    tokenSymbol,
    FIRST_PLAYER_ADDRESS,
    SECOND_PLAYER_ADDRESS,
    THIRD_PLAYER_ADDRESS,
    HOUSE_ADDRESS,
    TOKEN_CONTRACT_ADDRESS,
    getJackpotBalance,
} from "../../common/blockchainWrapper";

export function Balances() {
    const [ethBalances, setEthBalances] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([]);
    const [jackpotBalance, setJackpotBalance] = useState(undefined);

    const [block, setBlock] = useState({});

    const [rerender, setRerender] = useState(false);

    const ETH_TO_DEPOSIT = "1";
    const TOKENS_TO_REDEEM = "100000";
    const TOKENS_TO_TRANSFER = "10000";
    const NICKNAMES = {
        [FIRST_PLAYER_ADDRESS]: "Player 1 👤",
        [SECOND_PLAYER_ADDRESS]: "Player 2 👤",
        [THIRD_PLAYER_ADDRESS]: "Player 3 👤",
        [HOUSE_ADDRESS]: "House 🏠",
        [TOKEN_CONTRACT_ADDRESS]: "Token 📜",
    }

    const MS_REFRESH_INTERVAL = 1000;

    useEffect(() => {
        const interval = setInterval(() => {
            const addressesInDisplayOrder = [
                FIRST_PLAYER_ADDRESS,
                SECOND_PLAYER_ADDRESS,
                THIRD_PLAYER_ADDRESS,
                HOUSE_ADDRESS,
                TOKEN_CONTRACT_ADDRESS
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

            getBlock()
                .then((blockData) => {
                    setBlock(blockData);
                });

            getJackpotBalance()
                .then((jackpotBal) => {
                    setJackpotBalance(jackpotBal);
                });
        }, MS_REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, [rerender]);

    const combinedBalances = Object.keys(ethBalances).reduce((acc, address) => {
        acc[address] = {
            ethBalance: ethBalances[address],
            tokenBalance: tokenBalances[address]
        };
        return acc;
    }, {});

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
                            <th>Nickname</th>
                            <th>Address</th>
                            <th className="Balances-eth-balance">ETH Balance</th>
                            <th className="Balances-token-balance">{tokenSymbol} Balance</th>
                            <th className="Balances-button-header">Get Tokens</th>
                            <th className="Balances-button-header">Redeem Tokens</th>
                            <th className="Balances-button-header">Txfr Tokens</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jackpot 💰</td>
                            <td>--</td>
                            <td>--</td>
                            <td>{jackpotBalance}</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                        </tr>
                        {
                            Object.entries(combinedBalances).map(([addr, { ethBalance, tokenBalance }]) => {
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
                                                minimumFractionDigits: 8,
                                                maximumFractionDigits: 8
                                            })}
                                        </td>
                                        <td
                                            className="Balances-contract-interact-button-column">
                                            <button
                                                className="Balances-contract-interact-button"
                                                type="button"
                                                onClick={() => {
                                                    depositEthForTokens(
                                                        addr,
                                                        ETH_TO_DEPOSIT
                                                    ).then(() => {
                                                        setRerender(!rerender);
                                                    });
                                                }}
                                            >
                                                {`Deposit ${ETH_TO_DEPOSIT} ETH`}
                                            </button>
                                        </td>
                                        <td
                                            className="Balances-contract-interact-button-column">
                                            <button
                                                className="Balances-contract-interact-button"
                                                type="button"
                                                onClick={() => {
                                                    redeemTokensForEth(
                                                        addr,
                                                        TOKENS_TO_REDEEM
                                                    ).then(() => {
                                                        setRerender(!rerender);
                                                    });
                                                }}
                                            >
                                                {`Redeem ${Number(TOKENS_TO_REDEEM).toLocaleString()} ${tokenSymbol}`}
                                            </button>
                                        </td>
                                        <td
                                            className="Balances-contract-interact-button-column">
                                            <button
                                                className="Balances-contract-interact-button"
                                                type="button"
                                                onClick={() => {
                                                    transferFrom(
                                                        addr,
                                                        HOUSE_ADDRESS,
                                                        TOKENS_TO_TRANSFER
                                                    ).then(() => {
                                                        setRerender(!rerender);
                                                    });
                                                }}
                                            >
                                                {`Txfr ${Number(TOKENS_TO_TRANSFER).toLocaleString()} ${tokenSymbol}`}
                                            </button>
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
