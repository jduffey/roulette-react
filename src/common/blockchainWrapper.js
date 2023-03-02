import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// TODO: retrieve addresses from file generated by initialization script so they aren't hardcoded
const FIRST_PLAYER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const SECOND_PLAYER_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const THIRD_PLAYER_ADDRESS = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const HOUSE_ADDRESS = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
// Contract addresses are calculated from a hash of the deployer's address and nonce.
const TOKEN_CONTRACT_ADDRESS = "0x057ef64E23666F000b34aE31332854aCBd1c8544";
const ROULETTE_CONTRACT_ADDRESS = "0x261D8c5e9742e6f7f1076Fa1F560894524e19cad";

async function executeWager(address, wagerAmount, playerRewards) {
    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function executeWager(address, uint256, uint256)"],
        provider.getSigner(HOUSE_ADDRESS)
    );
    const tx = await contract.executeWager(
        address,
        wagerAmount,
        ethers.utils.parseEther(playerRewards)
    );
    return tx;
}

async function getTotalSpins() {
    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function getTotalSpins() public view returns (uint256)"],
        provider.getSigner(HOUSE_ADDRESS)
    );
    const count = await contract.getTotalSpins();
    return count;
}

async function getTotalAmountWagered() {
    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function getTotalAmountWagered() public view returns (uint256)"],
        provider.getSigner(HOUSE_ADDRESS)
    );
    const count = await contract.getTotalAmountWagered();
    return count;
}

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
    const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        ["function balanceOf(address) view returns (uint)"],
        provider.getSigner(HOUSE_ADDRESS)
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

async function getJackpotBalance() {
    // For now this is just the token balance of the contract
    // Later the Roulette contract will also handle all payouts and receipts of bets
    return await getTokenBalance(ROULETTE_CONTRACT_ADDRESS);
}

async function getPlayerSpins(address) {
    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function getPlayerSpins(address) public view returns (uint256)"],
        provider.getSigner(address)
    );
    const count = await contract.getPlayerSpins(address);
    return count;
}

async function getPlayerRewards(address) {
    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function getPlayerRewards(address) public view returns (uint256)"],
        provider.getSigner(address)
    );
    const count = await contract.getPlayerRewards(address);
    return ethers.utils.formatEther(count);
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
    executeWager,
    getTotalSpins,
    getTotalAmountWagered,
    getJackpotBalance,
    getPlayerSpins,
    getPlayerRewards,
    FIRST_PLAYER_ADDRESS,
    SECOND_PLAYER_ADDRESS,
    THIRD_PLAYER_ADDRESS,
    HOUSE_ADDRESS,
    TOKEN_CONTRACT_ADDRESS,
    ROULETTE_CONTRACT_ADDRESS,
    tokenSymbol,
};
