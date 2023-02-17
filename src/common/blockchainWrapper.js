import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// This is calculated from a hash of the deployer's address and nonce.
// The value "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f" comes from the last address
// generated by hardhat when running `npx hardhat node` combined with the nonce of 0.
// Sending any transaction from that address before deploying the contract will
// result in a different contract address.
const TOKEN_CONTRACT_ADDRESS = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";

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
    const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, [
        "function balanceOf(address) view returns (uint)",
    ], signer);
    const balance = await token.balanceOf(address);
    const formattedBalance = ethers.utils.formatEther(balance);
    return formattedBalance;
}

async function depositEthForTokens(from, amount) {
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, [
        "function deposit() payable",
    ], signer);
    const tx = await token.deposit({
        value: ethers.utils.parseEther(amount)
    });
    return tx;
}

async function redeemTokensForEth(from, amount) {
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, [
        "function withdraw(uint)",
    ], signer);
    const tx = await token.withdraw(ethers.utils.parseEther(amount));
    return tx;
}

async function transferFrom(from, to, amount) {
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, [
        "function transferFrom(address, address, uint) returns (bool)",
    ], signer);
    const tx = await token.transferFrom(from, to, ethers.utils.parseEther(amount));
    return tx;
}

let tokenSymbol;
(new ethers.Contract(
    TOKEN_CONTRACT_ADDRESS,
    ["function symbol() view returns (string)"],
    provider)
).symbol().then((symbol) => {
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
    tokenSymbol,
};