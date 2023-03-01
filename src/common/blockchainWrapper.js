import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Contract addresses are calculated from a hash of the deployer's address and nonce.
// TODO: retrieve this dynamically
const TOKEN_CONTRACT_ADDRESS = "0xbdEd0D2bf404bdcBa897a74E6657f1f12e5C6fb6";

const FIRST_PLAYER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const REWARDS_ADDRESS = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
const HOUSE_ADDRESS = "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65";

async function getEthBalance(address) {
    const signer = provider.getSigner(address);
    const balance = await signer.getBalance();
    return ethers.utils.formatEther(balance);
}

// TODO leaving this for reference
// async function sendEther(provider, from, to, amount) {
//     const signer = provider.getSigner(from);
//     const tx = await signer.sendTransaction({
//         to: to,
//         value: ethers.utils.parseEther(amount)
//     });
//     return tx;
// }

async function getBlock() {
    const block = await provider.getBlock();
    return block;
}

async function getTokenBalance(address) {
    const signer = provider.getSigner(address);
    const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        ["function balanceOf(address) view returns (uint)"],
        signer
    );
    const balance = await token.balanceOf(address);
    const formattedBalance = ethers.utils.formatEther(balance);
    return formattedBalance;
}

async function depositEthForTokens(from, amount) {
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        ["function deposit() payable"],
        signer
    );
    const tx = await token.deposit({
        value: ethers.utils.parseEther(amount)
    });
    return tx;
}

async function redeemTokensForEth(from, amount) {
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        ["function withdraw(uint)"],
        signer
    );
    const tx = await token.withdraw(ethers.utils.parseEther(amount));
    return tx;
}

async function transferFrom(from, to, amount) {
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        ["function transferFrom(address, address, uint) returns (bool)"],
        signer
    );
    const tx = await token.transferFrom(from, to, ethers.utils.parseEther(amount));
    return tx;
}

let tokenSymbol;
(new ethers.Contract(
    TOKEN_CONTRACT_ADDRESS,
    ["function symbol() view returns (string)"],
    provider
)).symbol().then((symbol) => {
    tokenSymbol = symbol;
});

export {
    getEthBalance,
    getBlock,
    getTokenBalance,
    depositEthForTokens,
    redeemTokensForEth,
    transferFrom,
    TOKEN_CONTRACT_ADDRESS,
    FIRST_PLAYER_ADDRESS,
    REWARDS_ADDRESS,
    HOUSE_ADDRESS,
    tokenSymbol,
};