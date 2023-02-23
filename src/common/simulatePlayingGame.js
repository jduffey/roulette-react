import { BET_NAMES } from "./betNames";

const NUMBER_OF_BETS_TO_PLACE = 5;
const SECONDS_BETWEEN_BET_PLACEMENTS = 1;

setInterval(() => {
    let betsPlaced = 0;
    setInterval(() => {
        if (betsPlaced++ >= NUMBER_OF_BETS_TO_PLACE) return;
        const selectedChipAmt = ((choices) => {
            const index = Math.floor(Math.random() * choices.length);
            return choices[index];
        })([1, 5, 25]);

        const selectedBet = ((choices) => {
            const index = Math.floor(Math.random() * choices.length);
            return choices[index];
        })(Object.values(BET_NAMES));

        const selectedChipElement = document.getElementById(`chip-${selectedChipAmt}`);
        const betElement = document.getElementById(selectedBet);

        selectedChipElement.click(selectedChipAmt);
        betElement.click();
    }, SECONDS_BETWEEN_BET_PLACEMENTS * 1000);

    const spinButtonElement = document.getElementById("spin-button");
    spinButtonElement.click();
}, (NUMBER_OF_BETS_TO_PLACE + 1) * SECONDS_BETWEEN_BET_PLACEMENTS * 1000);