import { BET_NAMES } from "./betNames";

import { CHIP_AMOUNTS } from "../components/roulette/Chip";

const NUMBER_OF_BETS_TO_PLACE = 1;

const SECONDS_BETWEEN_BET_PLACEMENTS = 3;

const getRandomElement = (choices) => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

// Track the current state of the simulation
let betsPlaced = 0;
let isSimulationActive = true;

// Single interval that handles both betting and spinning
const simulationInterval = setInterval(() => {
    if (!isSimulationActive) {
        clearInterval(simulationInterval);
        return;
    }

    if (betsPlaced < NUMBER_OF_BETS_TO_PLACE) {
        // Place a bet
        const selectedChipAmt = getRandomElement([
            CHIP_AMOUNTS.CHIP_1,
            CHIP_AMOUNTS.CHIP_2_HALF,
            CHIP_AMOUNTS.CHIP_5,
            CHIP_AMOUNTS.CHIP_25,
            // CHIP_AMOUNTS.CHIP_100,
            // CHIP_AMOUNTS.CHIP_500,
            // CHIP_AMOUNTS.CHIP_1000,
        ]);
        const selectedBet = getRandomElement(Object.values(BET_NAMES));
        // const selectedBet = BET_NAMES.BLACK;

        const selectedChipElement = document.getElementById(`chip-${selectedChipAmt}`);
        const betElement = document.getElementById(selectedBet);

        if (selectedChipElement && betElement) {
            selectedChipElement.click(selectedChipAmt);
            betElement.click();
        }
        
        betsPlaced++;
    } else {
        // All bets placed, now spin
        const spinButtonElement = document.getElementById("spin-button");
        if (spinButtonElement) {
            spinButtonElement.click();
        }
        
        // Reset for next cycle
        betsPlaced = 0;
        
        // Optional: Stop simulation after one complete cycle
        // isSimulationActive = false;
    }
}, SECONDS_BETWEEN_BET_PLACEMENTS * 1000);

// Export function to stop simulation if needed
export const stopSimulation = () => {
    isSimulationActive = false;
    clearInterval(simulationInterval);
};
