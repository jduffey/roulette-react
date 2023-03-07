import { BET_NAMES } from "./betNames";

import { CHIP_AMOUNTS } from "../components/roulette/Chip";

const NUMBER_OF_BETS_TO_PLACE = 1;

const SECONDS_BETWEEN_BET_PLACEMENTS = 0.5;

const getRandomElement = (choices) => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

setInterval(() => {
    let betsPlaced = 0;
    setInterval(() => {
        if (betsPlaced++ >= NUMBER_OF_BETS_TO_PLACE) return;

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

        selectedChipElement.click(selectedChipAmt);
        betElement.click();
    }, SECONDS_BETWEEN_BET_PLACEMENTS * 1000);

    const spinButtonElement = document.getElementById("spin-button");
    spinButtonElement.click();
}, (NUMBER_OF_BETS_TO_PLACE + 1) * SECONDS_BETWEEN_BET_PLACEMENTS * 1000);
