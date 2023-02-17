import { useEffect, useState } from "react";

import {
    getEthBalance,
    getBlock,
    getTokenBalance,
    depositEthForTokens,
    redeemTokensForEth,
    transferFrom,
    TOKEN_CONTRACT_ADDRESS,
    tokenSymbol,
} from "../../common/blockchainWrapper";

export function Balances() {
    const [ethBalances, setEthBalances] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([]);

    const [block, setBlock] = useState({});

    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        // Default values, including seed phrase: https://hardhat.org/hardhat-network/docs/reference
        const addresses = [
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
            "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            TOKEN_CONTRACT_ADDRESS
        ];

        const addressWithBalancePromises = addresses.map(async (address) => {
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

        const addressesWithTokenBalancePromises = addresses.map(async (address) => {
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
                            <th>Address</th>
                            <th className="Balances-eth-balance">ETH Balance</th>
                            <th className="Balances-token-balance">{tokenSymbol} Balance</th>
                            <th>Get Tokens</th>
                            <th>Redeem Tokens</th>
                            <th>Txfr Tokens</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(combinedBalances).map(([addr, { ethBalance, tokenBalance }]) => {
                                return (
                                    <tr key={addr}>
                                        <td>
                                            {`${addr.slice(0, 6)}..${addr.slice(-4)}`}
                                        </td>
                                        <td>
                                            {Number(ethBalance).toLocaleString(undefined, {
                                                minimumFractionDigits: 8,
                                                maximumFractionDigits: 8
                                            })}
                                        </td>
                                        <td>
                                            {Number(tokenBalance).toLocaleString(undefined, {
                                                minimumFractionDigits: 18,
                                                maximumFractionDigits: 18
                                            })}
                                        </td>
                                        <td
                                            className="Balances-contract-interact-button">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    depositEthForTokens(
                                                        addr,
                                                        "1"
                                                    ).then(() => {
                                                        setRerender(!rerender);
                                                    });
                                                }}
                                            >
                                                Deposit 1 ETH
                                            </button>
                                        </td>
                                        <td
                                            className="Balances-contract-interact-button">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    redeemTokensForEth(
                                                        addr,
                                                        "100000"
                                                    ).then(() => {
                                                        setRerender(!rerender);
                                                    });
                                                }}
                                            >
                                                Redeem 100,000 {tokenSymbol}
                                            </button>
                                        </td>
                                        <td
                                            className="Balances-contract-interact-button">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    transferFrom(
                                                        addr,
                                                        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
                                                        "10000"
                                                    ).then(() => {
                                                        setRerender(!rerender);
                                                    });
                                                }}
                                            >
                                                Txfr 10,000 {tokenSymbol}
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
