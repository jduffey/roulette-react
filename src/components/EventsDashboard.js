import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const ROULETTE_CONTRACT_ADDRESS = "0x261D8c5e9742e6f7f1076Fa1F560894524e19cad";

const contractForEvents = new ethers.Contract(
    ROULETTE_CONTRACT_ADDRESS,
    ['event WagerExecuted(address indexed player, uint256 wagerAmount, uint256 playerRewards, string wheelNumber)'],
    provider
);

contractForEvents.on('WagerExecuted', (player, wagerAmount, playerRewards, wheelNumber) => {
    console.log(`WagerExecuted event:\nplayer: ${player}\nwagerAmount: ${wagerAmount}\nplayerRewards: ${playerRewards}\nwheelNumber: ${wheelNumber}`);
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
