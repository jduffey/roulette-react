import { ethers } from "ethers";

import { BET_NAMES } from "./betNames";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// TODO: retrieve addresses from file generated by initialization script so they aren't hardcoded
const FIRST_PLAYER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const SECOND_PLAYER_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const THIRD_PLAYER_ADDRESS = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const HOUSE_ADDRESS = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
// Contract addresses are calculated from a hash of the deployer's address and nonce.
const TOKEN_CONTRACT_ADDRESS = "0x057ef64E23666F000b34aE31332854aCBd1c8544";
const RANDOMNESS_PROVIDER_CONTRACT_ADDRESS = "0x261D8c5e9742e6f7f1076Fa1F560894524e19cad";
const ROULETTE_CONTRACT_ADDRESS = "0xCE3478A9E0167a6Bc5716DC39DbbbfAc38F27623";

async function executeWager(address, wagerAmount, playerRewards, wheelNumber, betName, betAmount) {
    // convert betName to an int
    const convertedBetName = {
        [BET_NAMES.STRAIGHT_UP_0]: 0,
        [BET_NAMES.STRAIGHT_UP_1]: 1,
        [BET_NAMES.STRAIGHT_UP_2]: 2,
        [BET_NAMES.STRAIGHT_UP_3]: 3,
        [BET_NAMES.STRAIGHT_UP_4]: 4,
        [BET_NAMES.STRAIGHT_UP_5]: 5,
        [BET_NAMES.STRAIGHT_UP_6]: 6,
        [BET_NAMES.STRAIGHT_UP_7]: 7,
        [BET_NAMES.STRAIGHT_UP_8]: 8,
        [BET_NAMES.STRAIGHT_UP_9]: 9,
        [BET_NAMES.STRAIGHT_UP_10]: 10,
        [BET_NAMES.STRAIGHT_UP_11]: 11,
        [BET_NAMES.STRAIGHT_UP_12]: 12,
        [BET_NAMES.STRAIGHT_UP_13]: 13,
        [BET_NAMES.STRAIGHT_UP_14]: 14,
        [BET_NAMES.STRAIGHT_UP_15]: 15,
        [BET_NAMES.STRAIGHT_UP_16]: 16,
        [BET_NAMES.STRAIGHT_UP_17]: 17,
        [BET_NAMES.STRAIGHT_UP_18]: 18,
        [BET_NAMES.STRAIGHT_UP_19]: 19,
        [BET_NAMES.STRAIGHT_UP_20]: 20,
        [BET_NAMES.STRAIGHT_UP_21]: 21,
        [BET_NAMES.STRAIGHT_UP_22]: 22,
        [BET_NAMES.STRAIGHT_UP_23]: 23,
        [BET_NAMES.STRAIGHT_UP_24]: 24,
        [BET_NAMES.STRAIGHT_UP_25]: 25,
        [BET_NAMES.STRAIGHT_UP_26]: 26,
        [BET_NAMES.STRAIGHT_UP_27]: 27,
        [BET_NAMES.STRAIGHT_UP_28]: 28,
        [BET_NAMES.STRAIGHT_UP_29]: 29,
        [BET_NAMES.STRAIGHT_UP_30]: 30,
        [BET_NAMES.STRAIGHT_UP_31]: 31,
        [BET_NAMES.STRAIGHT_UP_32]: 32,
        [BET_NAMES.STRAIGHT_UP_33]: 33,
        [BET_NAMES.STRAIGHT_UP_34]: 34,
        [BET_NAMES.STRAIGHT_UP_35]: 35,
        [BET_NAMES.STRAIGHT_UP_36]: 36,
        [BET_NAMES.STRAIGHT_UP_00]: 37,
        [BET_NAMES.FIRST_18]: 38,
        [BET_NAMES.SECOND_18]: 39,
        [BET_NAMES.EVEN]: 40,
        [BET_NAMES.ODD]: 41,
        [BET_NAMES.RED]: 42,
        [BET_NAMES.BLACK]: 43,
        [BET_NAMES.FIRST_DOZEN]: 44,
        [BET_NAMES.SECOND_DOZEN]: 45,
        [BET_NAMES.THIRD_DOZEN]: 46,
        [BET_NAMES.FIRST_COLUMN]: 47,
        [BET_NAMES.SECOND_COLUMN]: 48,
        [BET_NAMES.THIRD_COLUMN]: 49,
    }[betName];

    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function executeWager(address, uint256, uint256, string, uint256, uint256)"],
        provider.getSigner(HOUSE_ADDRESS)
    );
    // console.log("wagerAmount", wagerAmount);
    const tx = await contract.executeWager(
        address,
        ethers.utils.parseEther(wagerAmount.toString()),
        ethers.utils.parseEther(playerRewards.toString()),
        wheelNumber,
        convertedBetName,
        ethers.utils.parseEther(betAmount.toString())
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
    return ethers.utils.formatEther(count);
}

async function getEthBalance(address) {
    const signer = provider.getSigner(address);
    const balance = await signer.getBalance();
    return ethers.utils.formatEther(balance);
}

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
    return ethers.utils.formatEther(balance);
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
    // console.log("transferFrom", from, to, amount);
    const signer = provider.getSigner(from);
    const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        ["function transferFrom(address, address, uint) returns (bool)"],
        signer
    );
    const tx = await token.transferFrom(from, to, ethers.utils.parseEther(amount));
    return tx;
}

async function getRewardsPoolBalance() {
    const tokenBalance = await getTokenBalance(ROULETTE_CONTRACT_ADDRESS);
    return tokenBalance;
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

async function getPlayerNumberCompletionSetsCounter(address) {
    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function getPlayerNumberCompletionSetsCounter(address) public view returns (uint256)"],
        provider.getSigner(address)
    );
    const count = await contract.getPlayerNumberCompletionSetsCounter(address);
    return count;
}

async function getPlayerNumberCompletionSetCurrent(address) {
    const contract = new ethers.Contract(
        ROULETTE_CONTRACT_ADDRESS,
        ["function getPlayerNumberCompletionSetCurrent(address) public view returns (string[])"],
        provider.getSigner(address)
    );
    const currentSet = await contract.getPlayerNumberCompletionSetCurrent(address);
    return currentSet;
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
    getRewardsPoolBalance,
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
    RANDOMNESS_PROVIDER_CONTRACT_ADDRESS,
    tokenSymbol,
};

// TODO leaving this for reference
// How to send ether from one address to another
// async function sendEther(provider, from, to, amount) {
//     const signer = provider.getSigner(from);
//     const tx = await signer.sendTransaction({
//         to: to,
//         value: ethers.utils.parseEther(amount)
//     });
//     return tx;
// }
