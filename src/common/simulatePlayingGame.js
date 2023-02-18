import { BET_NAMES } from "./betNames";

setInterval(function () {
    for (let i = 0; i < 10; i++) {
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
    }

    const spinButtonElement = document.getElementById("spin-button");
    spinButtonElement.click();
}, 3100);