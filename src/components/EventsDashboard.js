import { ethers } from "ethers";

import {
    ROULETTE_CONTRACT_ADDRESS,
    RANDOMNESS_PROVIDER_CONTRACT_ADDRESS,
} from "../common/blockchainWrapper";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const rouletteContract = new ethers.Contract(
    ROULETTE_CONTRACT_ADDRESS,
    [
        'event RandomnessObtained(uint256)',
        'event WagerExecuted(address indexed, uint256, uint256, string, string, uint256)',
    ],
    provider
);

rouletteContract.on('RandomnessObtained', (randomValue) => {
    console.log(`RandomnessObtained event: ${randomValue.toHexString()}`);
});

rouletteContract.on('WagerExecuted', (player, wagerAmount, playerRewards, wheelNumber, betName, betAmount) => {
    console.log(
        `WagerExecuted event:
player: ${player}
wagerAmount: ${ethers.utils.formatEther(wagerAmount)}
playerRewards: ${ethers.utils.formatEther(playerRewards)}
wheelNumber: ${wheelNumber}
betName: ${betName}
betAmount: ${ethers.utils.formatEther(betAmount)}`
    );
});

const randomnessProviderContract = new ethers.Contract(
    RANDOMNESS_PROVIDER_CONTRACT_ADDRESS,
    [
        'event RandomnessGenerated(address, uint256)',
    ],
    provider
);

randomnessProviderContract.on('RandomnessGenerated', (player, randomValue) => {
    console.log(
        `RandomnessGenerated event:
player: ${player}
randomValue: ${randomValue.toHexString()}`
    );
});

export function EventsDashboard() {
    return (
        <div
            style={{
                color: "white",
                fontSize: "4rem",
            }}
        >
            PLACEHOLDER PAGE FOR EVENTS
        </div>
    )
}
