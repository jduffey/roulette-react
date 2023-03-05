import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const ROULETTE_CONTRACT_ADDRESS = "0x261D8c5e9742e6f7f1076Fa1F560894524e19cad";

const contractForEvents = new ethers.Contract(
    ROULETTE_CONTRACT_ADDRESS,
    ['event WagerExecuted(address indexed, uint256, uint256, string)'],
    provider
);

contractForEvents.on('WagerExecuted', (player, wagerAmount, playerRewards, wheelNumber) => {
    console.log(
        `WagerExecuted event:
player: ${player}
wagerAmount: ${wagerAmount}
playerRewards: ${playerRewards}
wheelNumber: ${wheelNumber}`
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
