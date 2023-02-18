setInterval(function () {
    // for (let i = 0; i < 5 + Math.floor(Math.random() * 5); i++) {
    // for (let i = 0; i < 6; i++) {

    // setInterval(function () {
    const selectedChipAmt = ((choices) => {
        const index = Math.floor(Math.random() * choices.length);
        return choices[index];
    })([1, 5]);

    const selectedBet = ((choices) => {
        const index = Math.floor(Math.random() * choices.length);
        return choices[index];
    })([
        "StraightUp_0",
        "StraightUp_00",
        "StraightUp_1",
        "StraightUp_2",
        "StraightUp_3",
        "StraightUp_4",
        "StraightUp_5",
        "StraightUp_6",
        "StraightUp_7",
        "StraightUp_8",
        "StraightUp_9",
        "StraightUp_10",
        "StraightUp_11",
        "StraightUp_12",
        "StraightUp_13",
        "StraightUp_14",
        "StraightUp_15",
        "StraightUp_16",
        "StraightUp_17",
        "StraightUp_18",
        "StraightUp_19",
        "StraightUp_20",
        "StraightUp_21",
        "StraightUp_22",
        "StraightUp_23",
        "StraightUp_24",
        "StraightUp_25",
        "StraightUp_26",
        "StraightUp_27",
        "StraightUp_28",
        "StraightUp_29",
        "StraightUp_30",
        "StraightUp_31",
        "StraightUp_32",
        "StraightUp_33",
        "StraightUp_34",
        "StraightUp_35",
        "StraightUp_36",
        "1st 12",
        "2nd 12",
        "3rd 12",
        "1 to 18",
        "19 to 36",
        "Even",
        "Odd",
        "1st Column",
        "2nd Column",
        "3rd Column",
        "Red",
        "Black",
    ]);

    const selectedChipElement = document.getElementById(`chip-${selectedChipAmt}`);
    const betElement = document.getElementById(selectedBet);

    selectedChipElement.click(selectedChipAmt);
    betElement.click();
// }, 1000);
// }

const spinButtonElement = document.getElementById("spin-button");
spinButtonElement.click();
}, 1000);