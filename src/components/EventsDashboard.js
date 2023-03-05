import { ethers } from "ethers";

import { ROULETTE_CONTRACT_ADDRESS } from "../common/blockchainWrapper";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const contractForEvents = new ethers.Contract(
    ROULETTE_CONTRACT_ADDRESS,
    [
        'event RandomnessObtained(uint256)',
        'event WagerExecuted(address indexed, uint256, uint256, string, string, uint256)',
        'event EventBlockData(uint256, uint256, uint256)',
    ],
    provider
);

contractForEvents.on('RandomnessObtained', (randomValue) => {
    console.log(`RandomnessObtained event: ${randomValue.toHexString()}`);
});

contractForEvents.on('WagerExecuted', (player, wagerAmount, playerRewards, wheelNumber, betName, betAmount) => {
    console.log(
        `WagerExecuted event:
player: ${player}
wagerAmount: ${wagerAmount}
playerRewards: ${playerRewards}
wheelNumber: ${wheelNumber}
betName: ${betName}
betAmount: ${betAmount}`
    );
});

contractForEvents.on('EventBlockData', (previousBlockhash, moduluFoo, difficulty) => {
    console.log(
        `EventBlockData event:
previousBlockhash: ${previousBlockhash.toHexString()}
moduluFoo: ${moduluFoo}
difficulty: ${difficulty.toHexString()}`
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
