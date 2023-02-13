import { ethers } from "ethers";

import { useState } from "react";
import { useEffect } from "react";

import {
    getBlock,
    getTokenBalance,
    depositEthForTokens,
    redeemTokensForEth,
    getEthBalance,
    TOKEN_CONTRACT_ADDRESS,
    provider
} from "../../common/blockchainWrapper";

export function Balances() {
    const [ethBalances, setEthBalances] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([]);

    const [block, setBlock] = useState({});

    const [rerender, setRerender] = useState(false);

    const [tokenSymbol, setTokenSymbol] = useState("");

    useEffect(() => {
        // Default values, including seed phrase: https://hardhat.org/hardhat-network/docs/reference
        const addresses = [
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
            "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
            "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
            "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
            "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
            "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
            "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
            "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
            "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
            "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
            "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
            "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
            "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
            "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
            "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
            "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
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

        // TODO figure out how to get the token symbol just once.. no need to do this every time we render obviously
        const token = new ethers.Contract(
            TOKEN_CONTRACT_ADDRESS,
            ["function symbol() view returns (string)"],
            provider);
        token.symbol().then((symbol) => {
            setTokenSymbol(symbol);
        });

        const addressesWithTokenBalancePromises = addresses.map(async (address) => {
            const balance = await getTokenBalance(address, TOKEN_CONTRACT_ADDRESS);
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
            .then((block) => {
                setBlock(block);
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
                        <tr>
                            <th>Address</th>
                            <th className="Balances-eth-balance">ETH Balance</th>
                            <th className="Balances-token-balance">{tokenSymbol} Balance</th>
                            <th>Get Tokens</th>
                            <th>Redeem Tokens</th>
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
                                                onClick={() => {
                                                    depositEthForTokens(
                                                        addr,
                                                        TOKEN_CONTRACT_ADDRESS,
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
                                                onClick={() => {
                                                    redeemTokensForEth(
                                                        addr,
                                                        TOKEN_CONTRACT_ADDRESS,
                                                        "100000"
                                                    ).then(() => {
                                                        setRerender(!rerender);
                                                    });
                                                }}
                                            >
                                                Redeem 100,000 {tokenSymbol}
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
