import { ethers } from "ethers";
import { useState } from "react";
import { useEffect } from "react";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

async function getEthBalance(provider, address) {
    const signer = provider.getSigner(address);
    const balance = await signer.getBalance();
    return ethers.utils.formatEther(balance);
}

async function sendEther(provider, from, to, amount) {
    const signer = provider.getSigner(from);
    const tx = await signer.sendTransaction({
        to: to,
        value: ethers.utils.parseEther(amount)
    });
    return tx;
}

async function getBlock(provider) {
    const block = await provider.getBlock();
    return block;
}

async function getTokenBalance(provider, address, tokenAddress) {
    const signer = provider.getSigner(address);
    const token = new ethers.Contract(tokenAddress, [
        "function balanceOf(address) view returns (uint)",
    ], signer);
    const balance = await token.balanceOf(address);
    const formattedBalance = ethers.utils.formatEther(balance);
    return formattedBalance;
}

async function depositEther(provider, from, tokenAddress, amount) {
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(tokenAddress, [
        "function deposit() payable",
    ], signer);
    const tx = await token.deposit({
        value: ethers.utils.parseEther(amount)
    });
    return tx;
}

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
        ];

        const addressWithBalancePromises = addresses.map(async (address) => {
            const balance = await getEthBalance(provider, address);
            return { address, balance };
        });

        Promise.all(addressWithBalancePromises).then((res) => {
            const newBalances = res.reduce((acc, cur) => {
                acc[cur.address] = cur.balance;
                return acc;
            }, {});
            setEthBalances(newBalances);
        });

        const tokenContractAddress = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";

        // TODO figure out how to get the token symbol just once.. no need to do this every time we render obviously
        const token = new ethers.Contract(
            tokenContractAddress,
            ["function symbol() view returns (string)"],
            provider);
        token.symbol().then((symbol) => {
            setTokenSymbol(symbol);
        });

        const addressesWithTokenBalancePromises = addresses.map(async (address) => {
            const balance = await getTokenBalance(provider, address, tokenContractAddress);
            return { address, balance };
        });

        Promise.all(addressesWithTokenBalancePromises).then((res) => {
            const newBalances = res.reduce((acc, cur) => {
                acc[cur.address] = cur.balance;
                return acc;
            }, {});
            setTokenBalances(newBalances);
        });

        getBlock(provider)
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
            style={{
                color: "white",
                fontFamily: "monospace",
                fontSize: "1.25rem",
            }}
        >
            <div>
                {Object.entries(block).map(([key, value]) => {
                    return (
                        <div key={key}>
                            {`${key}: ${value}`}
                        </div>
                    );
                })}
            </div>

            <div>
                <button
                    onClick={() => {
                        depositEther(
                            provider,
                            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                            "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f",
                            "1"
                        ).then(() => {
                            setRerender(!rerender);
                        });
                    }}
                >
                    Deposit 1 ETH to 0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        sendEther(
                            provider,
                            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                            "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                            "1"
                        ).then(() => {
                            setRerender(!rerender);
                        });
                    }}
                >
                    Send 1 ETH from 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>ETH Balance</th>
                            <th>{tokenSymbol} Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(combinedBalances).map(([addr, { ethBalance, tokenBalance }]) => {
                                return (
                                    <tr key={addr}>
                                        <td>{`${addr.slice(0, 6)}..${addr.slice(-4)}`}</td>
                                        <td>{Number(ethBalance).toFixed(18).padStart(18 + 6, String.fromCharCode(160))}</td>
                                        <td>{Number(tokenBalance).toFixed(18).padStart(18 + 10, String.fromCharCode(160))}</td>
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
