import { BET_NAMES } from "../common/betNames";
import { WHEEL_NUMBERS } from "../common/wheelNumbers";

import { getNewBalance } from "../common/getNewBalance";

const startingBalance = 100;
const chipAmount = 1;

// TODO this test is a first draft and not robust against bet names with identical multiplier values being incorrectly applied
// e.g. WN_1 should win for first dozen but applying the second dozen multiplier would result in a false positive
describe("1 chip on all bet names", () => {
    it.each([
        [WHEEL_NUMBERS.WN_0, 100 - 50 + 35 + 1], // only one straight up bet wins
        [WHEEL_NUMBERS.WN_00, 86],
        [WHEEL_NUMBERS.WN_1, 100 - 50 + 42 + 6],  // leaving the "show your work" for now, refactor expected values later
        [WHEEL_NUMBERS.WN_2, 98],
        [WHEEL_NUMBERS.WN_3, 98],
        [WHEEL_NUMBERS.WN_4, 98],
        [WHEEL_NUMBERS.WN_5, 98],
        [WHEEL_NUMBERS.WN_6, 98],
        [WHEEL_NUMBERS.WN_7, 98],
        [WHEEL_NUMBERS.WN_8, 98],
        [WHEEL_NUMBERS.WN_9, 98],
        [WHEEL_NUMBERS.WN_10, 98],
        [WHEEL_NUMBERS.WN_11, 98],
        [WHEEL_NUMBERS.WN_12, 98],
        [WHEEL_NUMBERS.WN_13, 98],
        [WHEEL_NUMBERS.WN_14, 98],
        [WHEEL_NUMBERS.WN_15, 98],
        [WHEEL_NUMBERS.WN_16, 98],
        [WHEEL_NUMBERS.WN_17, 98],
        [WHEEL_NUMBERS.WN_18, 98],
        [WHEEL_NUMBERS.WN_19, 98],
        [WHEEL_NUMBERS.WN_20, 98],
        [WHEEL_NUMBERS.WN_21, 98],
        [WHEEL_NUMBERS.WN_22, 98],
        [WHEEL_NUMBERS.WN_23, 98],
        [WHEEL_NUMBERS.WN_24, 98],
        [WHEEL_NUMBERS.WN_25, 98],
        [WHEEL_NUMBERS.WN_26, 98],
        [WHEEL_NUMBERS.WN_27, 98],
        [WHEEL_NUMBERS.WN_28, 98],
        [WHEEL_NUMBERS.WN_29, 98],
        [WHEEL_NUMBERS.WN_30, 98],
        [WHEEL_NUMBERS.WN_31, 98],
        [WHEEL_NUMBERS.WN_32, 98],
        [WHEEL_NUMBERS.WN_33, 98],
        [WHEEL_NUMBERS.WN_34, 98],
        [WHEEL_NUMBERS.WN_35, 98],
        [WHEEL_NUMBERS.WN_36, 98],
    ])("bet name %s should return %i", (wheelNumber, expectedBalance) => {
        const betAmounts = Object.keys(BET_NAMES).reduce((acc, betName) => {
            acc[BET_NAMES[betName]] = chipAmount;
            return acc;
        }, {});

        if (
            Object.keys(betAmounts).length !== 50 ||
            Object.values(betAmounts).reduce((acc, betAmount) => acc + betAmount, 0) !== 50) {
            throw new Error("Verifying that there are 50 bet names until more are implemented");
        }

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});
