import { ethers } from "ethers";

import {
    ROULETTE_CONTRACT_ADDRESS,
} from "../common/blockchainWrapper";

// const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// const rouletteContract = new ethers.Contract(
//     ROULETTE_CONTRACT_ADDRESS,
//     [
//         'event WagerSubmitted(address indexed, uint256, string)',
//         'event RandomnessObtained(uint256)',
//         'event WheelNumber(uint256)',
//     ],
//     provider
// );

// rouletteContract.on('WagerSubmitted', (player, wagerAmount, betName) => {
//     console.log(
//         `WagerSubmitted event:
// player: ${player}
// wagerAmount: ${ethers.utils.formatEther(wagerAmount)}
// betName: ${betName}`
//     );
// });

// rouletteContract.on('RandomnessObtained', (randomValue) => {
//     console.log(`RandomnessObtained event: ${randomValue.toHexString()}`);
// });

// rouletteContract.on('WheelNumber', (wheelNumber) => {
//     console.log(`WheelNumber event: ${wheelNumber}`);
// });

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
