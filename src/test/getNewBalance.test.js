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

describe("Straight Up", () => {
    it.each([
        [BET_NAMES.STRAIGHT_UP_0, WHEEL_NUMBERS.WN_0, 135],
        [BET_NAMES.STRAIGHT_UP_00, WHEEL_NUMBERS.WN_00, 135],
        [BET_NAMES.STRAIGHT_UP_1, WHEEL_NUMBERS.WN_1, 135],
        [BET_NAMES.STRAIGHT_UP_2, WHEEL_NUMBERS.WN_2, 135],
        [BET_NAMES.STRAIGHT_UP_3, WHEEL_NUMBERS.WN_3, 135],
        [BET_NAMES.STRAIGHT_UP_4, WHEEL_NUMBERS.WN_4, 135],
        [BET_NAMES.STRAIGHT_UP_5, WHEEL_NUMBERS.WN_5, 135],
        [BET_NAMES.STRAIGHT_UP_6, WHEEL_NUMBERS.WN_6, 135],
        [BET_NAMES.STRAIGHT_UP_7, WHEEL_NUMBERS.WN_7, 135],
        [BET_NAMES.STRAIGHT_UP_8, WHEEL_NUMBERS.WN_8, 135],
        [BET_NAMES.STRAIGHT_UP_9, WHEEL_NUMBERS.WN_9, 135],
        [BET_NAMES.STRAIGHT_UP_10, WHEEL_NUMBERS.WN_10, 135],
        [BET_NAMES.STRAIGHT_UP_11, WHEEL_NUMBERS.WN_11, 135],
        [BET_NAMES.STRAIGHT_UP_12, WHEEL_NUMBERS.WN_12, 135],
        [BET_NAMES.STRAIGHT_UP_13, WHEEL_NUMBERS.WN_13, 135],
        [BET_NAMES.STRAIGHT_UP_14, WHEEL_NUMBERS.WN_14, 135],
        [BET_NAMES.STRAIGHT_UP_15, WHEEL_NUMBERS.WN_15, 135],
        [BET_NAMES.STRAIGHT_UP_16, WHEEL_NUMBERS.WN_16, 135],
        [BET_NAMES.STRAIGHT_UP_17, WHEEL_NUMBERS.WN_17, 135],
        [BET_NAMES.STRAIGHT_UP_18, WHEEL_NUMBERS.WN_18, 135],
        [BET_NAMES.STRAIGHT_UP_19, WHEEL_NUMBERS.WN_19, 135],
        [BET_NAMES.STRAIGHT_UP_20, WHEEL_NUMBERS.WN_20, 135],
        [BET_NAMES.STRAIGHT_UP_21, WHEEL_NUMBERS.WN_21, 135],
        [BET_NAMES.STRAIGHT_UP_22, WHEEL_NUMBERS.WN_22, 135],
        [BET_NAMES.STRAIGHT_UP_23, WHEEL_NUMBERS.WN_23, 135],
        [BET_NAMES.STRAIGHT_UP_24, WHEEL_NUMBERS.WN_24, 135],
        [BET_NAMES.STRAIGHT_UP_25, WHEEL_NUMBERS.WN_25, 135],
        [BET_NAMES.STRAIGHT_UP_26, WHEEL_NUMBERS.WN_26, 135],
        [BET_NAMES.STRAIGHT_UP_27, WHEEL_NUMBERS.WN_27, 135],
        [BET_NAMES.STRAIGHT_UP_28, WHEEL_NUMBERS.WN_28, 135],
        [BET_NAMES.STRAIGHT_UP_29, WHEEL_NUMBERS.WN_29, 135],
        [BET_NAMES.STRAIGHT_UP_30, WHEEL_NUMBERS.WN_30, 135],
        [BET_NAMES.STRAIGHT_UP_31, WHEEL_NUMBERS.WN_31, 135],
        [BET_NAMES.STRAIGHT_UP_32, WHEEL_NUMBERS.WN_32, 135],
        [BET_NAMES.STRAIGHT_UP_33, WHEEL_NUMBERS.WN_33, 135],
        [BET_NAMES.STRAIGHT_UP_34, WHEEL_NUMBERS.WN_34, 135],
        [BET_NAMES.STRAIGHT_UP_35, WHEEL_NUMBERS.WN_35, 135],
        [BET_NAMES.STRAIGHT_UP_36, WHEEL_NUMBERS.WN_36, 135],
    ])("%s, wheel number %s -> ending balance %i", (betName, wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("First 18", () => {
    const betName = BET_NAMES.FIRST_18;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 101],
        [WHEEL_NUMBERS.WN_18, 101],
        [WHEEL_NUMBERS.WN_19, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Second 18", () => {
    const betName = BET_NAMES.SECOND_18;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_18, 99],
        [WHEEL_NUMBERS.WN_19, 101],
        [WHEEL_NUMBERS.WN_36, 101],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Even", () => {
    const betName = BET_NAMES.EVEN;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 99],
        [WHEEL_NUMBERS.WN_3, 99],
        [WHEEL_NUMBERS.WN_5, 99],
        [WHEEL_NUMBERS.WN_7, 99],
        [WHEEL_NUMBERS.WN_9, 99],
        [WHEEL_NUMBERS.WN_11, 99],
        [WHEEL_NUMBERS.WN_13, 99],
        [WHEEL_NUMBERS.WN_15, 99],
        [WHEEL_NUMBERS.WN_17, 99],
        [WHEEL_NUMBERS.WN_19, 99],
        [WHEEL_NUMBERS.WN_21, 99],
        [WHEEL_NUMBERS.WN_23, 99],
        [WHEEL_NUMBERS.WN_25, 99],
        [WHEEL_NUMBERS.WN_27, 99],
        [WHEEL_NUMBERS.WN_29, 99],
        [WHEEL_NUMBERS.WN_31, 99],
        [WHEEL_NUMBERS.WN_33, 99],
        [WHEEL_NUMBERS.WN_35, 99],
        [WHEEL_NUMBERS.WN_2, 101],
        [WHEEL_NUMBERS.WN_4, 101],
        [WHEEL_NUMBERS.WN_6, 101],
        [WHEEL_NUMBERS.WN_8, 101],
        [WHEEL_NUMBERS.WN_10, 101],
        [WHEEL_NUMBERS.WN_12, 101],
        [WHEEL_NUMBERS.WN_14, 101],
        [WHEEL_NUMBERS.WN_16, 101],
        [WHEEL_NUMBERS.WN_18, 101],
        [WHEEL_NUMBERS.WN_20, 101],
        [WHEEL_NUMBERS.WN_22, 101],
        [WHEEL_NUMBERS.WN_24, 101],
        [WHEEL_NUMBERS.WN_26, 101],
        [WHEEL_NUMBERS.WN_28, 101],
        [WHEEL_NUMBERS.WN_30, 101],
        [WHEEL_NUMBERS.WN_32, 101],
        [WHEEL_NUMBERS.WN_34, 101],
        [WHEEL_NUMBERS.WN_36, 101],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Odd", () => {
    const betName = BET_NAMES.ODD;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 101],
        [WHEEL_NUMBERS.WN_3, 101],
        [WHEEL_NUMBERS.WN_5, 101],
        [WHEEL_NUMBERS.WN_7, 101],
        [WHEEL_NUMBERS.WN_9, 101],
        [WHEEL_NUMBERS.WN_11, 101],
        [WHEEL_NUMBERS.WN_13, 101],
        [WHEEL_NUMBERS.WN_15, 101],
        [WHEEL_NUMBERS.WN_17, 101],
        [WHEEL_NUMBERS.WN_19, 101],
        [WHEEL_NUMBERS.WN_21, 101],
        [WHEEL_NUMBERS.WN_23, 101],
        [WHEEL_NUMBERS.WN_25, 101],
        [WHEEL_NUMBERS.WN_27, 101],
        [WHEEL_NUMBERS.WN_29, 101],
        [WHEEL_NUMBERS.WN_31, 101],
        [WHEEL_NUMBERS.WN_33, 101],
        [WHEEL_NUMBERS.WN_35, 101],
        [WHEEL_NUMBERS.WN_2, 99],
        [WHEEL_NUMBERS.WN_4, 99],
        [WHEEL_NUMBERS.WN_6, 99],
        [WHEEL_NUMBERS.WN_8, 99],
        [WHEEL_NUMBERS.WN_10, 99],
        [WHEEL_NUMBERS.WN_12, 99],
        [WHEEL_NUMBERS.WN_14, 99],
        [WHEEL_NUMBERS.WN_16, 99],
        [WHEEL_NUMBERS.WN_18, 99],
        [WHEEL_NUMBERS.WN_20, 99],
        [WHEEL_NUMBERS.WN_22, 99],
        [WHEEL_NUMBERS.WN_24, 99],
        [WHEEL_NUMBERS.WN_26, 99],
        [WHEEL_NUMBERS.WN_28, 99],
        [WHEEL_NUMBERS.WN_30, 99],
        [WHEEL_NUMBERS.WN_32, 99],
        [WHEEL_NUMBERS.WN_34, 99],
        [WHEEL_NUMBERS.WN_36, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Red", () => {
    const betName = BET_NAMES.RED;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 101],
        [WHEEL_NUMBERS.WN_3, 101],
        [WHEEL_NUMBERS.WN_5, 101],
        [WHEEL_NUMBERS.WN_7, 101],
        [WHEEL_NUMBERS.WN_9, 101],
        [WHEEL_NUMBERS.WN_12, 101],
        [WHEEL_NUMBERS.WN_14, 101],
        [WHEEL_NUMBERS.WN_16, 101],
        [WHEEL_NUMBERS.WN_18, 101],
        [WHEEL_NUMBERS.WN_19, 101],
        [WHEEL_NUMBERS.WN_21, 101],
        [WHEEL_NUMBERS.WN_23, 101],
        [WHEEL_NUMBERS.WN_25, 101],
        [WHEEL_NUMBERS.WN_27, 101],
        [WHEEL_NUMBERS.WN_30, 101],
        [WHEEL_NUMBERS.WN_32, 101],
        [WHEEL_NUMBERS.WN_34, 101],
        [WHEEL_NUMBERS.WN_36, 101],
        [WHEEL_NUMBERS.WN_2, 99],
        [WHEEL_NUMBERS.WN_4, 99],
        [WHEEL_NUMBERS.WN_6, 99],
        [WHEEL_NUMBERS.WN_8, 99],
        [WHEEL_NUMBERS.WN_10, 99],
        [WHEEL_NUMBERS.WN_11, 99],
        [WHEEL_NUMBERS.WN_13, 99],
        [WHEEL_NUMBERS.WN_15, 99],
        [WHEEL_NUMBERS.WN_17, 99],
        [WHEEL_NUMBERS.WN_20, 99],
        [WHEEL_NUMBERS.WN_22, 99],
        [WHEEL_NUMBERS.WN_24, 99],
        [WHEEL_NUMBERS.WN_26, 99],
        [WHEEL_NUMBERS.WN_28, 99],
        [WHEEL_NUMBERS.WN_29, 99],
        [WHEEL_NUMBERS.WN_31, 99],
        [WHEEL_NUMBERS.WN_33, 99],
        [WHEEL_NUMBERS.WN_35, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Black", () => {
    const betName = BET_NAMES.BLACK;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_2, 101],
        [WHEEL_NUMBERS.WN_4, 101],
        [WHEEL_NUMBERS.WN_6, 101],
        [WHEEL_NUMBERS.WN_8, 101],
        [WHEEL_NUMBERS.WN_10, 101],
        [WHEEL_NUMBERS.WN_11, 101],
        [WHEEL_NUMBERS.WN_13, 101],
        [WHEEL_NUMBERS.WN_15, 101],
        [WHEEL_NUMBERS.WN_17, 101],
        [WHEEL_NUMBERS.WN_20, 101],
        [WHEEL_NUMBERS.WN_22, 101],
        [WHEEL_NUMBERS.WN_24, 101],
        [WHEEL_NUMBERS.WN_26, 101],
        [WHEEL_NUMBERS.WN_28, 101],
        [WHEEL_NUMBERS.WN_29, 101],
        [WHEEL_NUMBERS.WN_31, 101],
        [WHEEL_NUMBERS.WN_33, 101],
        [WHEEL_NUMBERS.WN_35, 101],
        [WHEEL_NUMBERS.WN_1, 99],
        [WHEEL_NUMBERS.WN_3, 99],
        [WHEEL_NUMBERS.WN_5, 99],
        [WHEEL_NUMBERS.WN_7, 99],
        [WHEEL_NUMBERS.WN_9, 99],
        [WHEEL_NUMBERS.WN_12, 99],
        [WHEEL_NUMBERS.WN_14, 99],
        [WHEEL_NUMBERS.WN_16, 99],
        [WHEEL_NUMBERS.WN_18, 99],
        [WHEEL_NUMBERS.WN_19, 99],
        [WHEEL_NUMBERS.WN_21, 99],
        [WHEEL_NUMBERS.WN_23, 99],
        [WHEEL_NUMBERS.WN_25, 99],
        [WHEEL_NUMBERS.WN_27, 99],
        [WHEEL_NUMBERS.WN_30, 99],
        [WHEEL_NUMBERS.WN_32, 99],
        [WHEEL_NUMBERS.WN_34, 99],
        [WHEEL_NUMBERS.WN_36, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("First Dozen", () => {
    const betName = BET_NAMES.FIRST_DOZEN;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 102],
        [WHEEL_NUMBERS.WN_2, 102],
        [WHEEL_NUMBERS.WN_3, 102],
        [WHEEL_NUMBERS.WN_4, 102],
        [WHEEL_NUMBERS.WN_5, 102],
        [WHEEL_NUMBERS.WN_6, 102],
        [WHEEL_NUMBERS.WN_7, 102],
        [WHEEL_NUMBERS.WN_8, 102],
        [WHEEL_NUMBERS.WN_9, 102],
        [WHEEL_NUMBERS.WN_10, 102],
        [WHEEL_NUMBERS.WN_11, 102],
        [WHEEL_NUMBERS.WN_12, 102],
        [WHEEL_NUMBERS.WN_13, 99],
        [WHEEL_NUMBERS.WN_14, 99],
        [WHEEL_NUMBERS.WN_15, 99],
        [WHEEL_NUMBERS.WN_16, 99],
        [WHEEL_NUMBERS.WN_17, 99],
        [WHEEL_NUMBERS.WN_18, 99],
        [WHEEL_NUMBERS.WN_19, 99],
        [WHEEL_NUMBERS.WN_20, 99],
        [WHEEL_NUMBERS.WN_21, 99],
        [WHEEL_NUMBERS.WN_22, 99],
        [WHEEL_NUMBERS.WN_23, 99],
        [WHEEL_NUMBERS.WN_24, 99],
        [WHEEL_NUMBERS.WN_25, 99],
        [WHEEL_NUMBERS.WN_26, 99],
        [WHEEL_NUMBERS.WN_27, 99],
        [WHEEL_NUMBERS.WN_28, 99],
        [WHEEL_NUMBERS.WN_29, 99],
        [WHEEL_NUMBERS.WN_30, 99],
        [WHEEL_NUMBERS.WN_31, 99],
        [WHEEL_NUMBERS.WN_32, 99],
        [WHEEL_NUMBERS.WN_33, 99],
        [WHEEL_NUMBERS.WN_34, 99],
        [WHEEL_NUMBERS.WN_35, 99],
        [WHEEL_NUMBERS.WN_36, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Second Dozen", () => {
    const betName = BET_NAMES.SECOND_DOZEN;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 99],
        [WHEEL_NUMBERS.WN_2, 99],
        [WHEEL_NUMBERS.WN_3, 99],
        [WHEEL_NUMBERS.WN_4, 99],
        [WHEEL_NUMBERS.WN_5, 99],
        [WHEEL_NUMBERS.WN_6, 99],
        [WHEEL_NUMBERS.WN_7, 99],
        [WHEEL_NUMBERS.WN_8, 99],
        [WHEEL_NUMBERS.WN_9, 99],
        [WHEEL_NUMBERS.WN_10, 99],
        [WHEEL_NUMBERS.WN_11, 99],
        [WHEEL_NUMBERS.WN_12, 99],
        [WHEEL_NUMBERS.WN_13, 102],
        [WHEEL_NUMBERS.WN_14, 102],
        [WHEEL_NUMBERS.WN_15, 102],
        [WHEEL_NUMBERS.WN_16, 102],
        [WHEEL_NUMBERS.WN_17, 102],
        [WHEEL_NUMBERS.WN_18, 102],
        [WHEEL_NUMBERS.WN_19, 102],
        [WHEEL_NUMBERS.WN_20, 102],
        [WHEEL_NUMBERS.WN_21, 102],
        [WHEEL_NUMBERS.WN_22, 102],
        [WHEEL_NUMBERS.WN_23, 102],
        [WHEEL_NUMBERS.WN_24, 102],
        [WHEEL_NUMBERS.WN_25, 99],
        [WHEEL_NUMBERS.WN_26, 99],
        [WHEEL_NUMBERS.WN_27, 99],
        [WHEEL_NUMBERS.WN_28, 99],
        [WHEEL_NUMBERS.WN_29, 99],
        [WHEEL_NUMBERS.WN_30, 99],
        [WHEEL_NUMBERS.WN_31, 99],
        [WHEEL_NUMBERS.WN_32, 99],
        [WHEEL_NUMBERS.WN_33, 99],
        [WHEEL_NUMBERS.WN_34, 99],
        [WHEEL_NUMBERS.WN_35, 99],
        [WHEEL_NUMBERS.WN_36, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Third Dozen", () => {
    const betName = BET_NAMES.THIRD_DOZEN;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 99],
        [WHEEL_NUMBERS.WN_2, 99],
        [WHEEL_NUMBERS.WN_3, 99],
        [WHEEL_NUMBERS.WN_4, 99],
        [WHEEL_NUMBERS.WN_5, 99],
        [WHEEL_NUMBERS.WN_6, 99],
        [WHEEL_NUMBERS.WN_7, 99],
        [WHEEL_NUMBERS.WN_8, 99],
        [WHEEL_NUMBERS.WN_9, 99],
        [WHEEL_NUMBERS.WN_10, 99],
        [WHEEL_NUMBERS.WN_11, 99],
        [WHEEL_NUMBERS.WN_12, 99],
        [WHEEL_NUMBERS.WN_13, 99],
        [WHEEL_NUMBERS.WN_14, 99],
        [WHEEL_NUMBERS.WN_15, 99],
        [WHEEL_NUMBERS.WN_16, 99],
        [WHEEL_NUMBERS.WN_17, 99],
        [WHEEL_NUMBERS.WN_18, 99],
        [WHEEL_NUMBERS.WN_19, 99],
        [WHEEL_NUMBERS.WN_20, 99],
        [WHEEL_NUMBERS.WN_21, 99],
        [WHEEL_NUMBERS.WN_22, 99],
        [WHEEL_NUMBERS.WN_23, 99],
        [WHEEL_NUMBERS.WN_24, 99],
        [WHEEL_NUMBERS.WN_25, 102],
        [WHEEL_NUMBERS.WN_26, 102],
        [WHEEL_NUMBERS.WN_27, 102],
        [WHEEL_NUMBERS.WN_28, 102],
        [WHEEL_NUMBERS.WN_29, 102],
        [WHEEL_NUMBERS.WN_30, 102],
        [WHEEL_NUMBERS.WN_31, 102],
        [WHEEL_NUMBERS.WN_32, 102],
        [WHEEL_NUMBERS.WN_33, 102],
        [WHEEL_NUMBERS.WN_34, 102],
        [WHEEL_NUMBERS.WN_35, 102],
        [WHEEL_NUMBERS.WN_36, 102],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("First Column", () => {
    const betName = BET_NAMES.FIRST_COLUMN;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 102],
        [WHEEL_NUMBERS.WN_2, 99],
        [WHEEL_NUMBERS.WN_3, 99],
        [WHEEL_NUMBERS.WN_4, 102],
        [WHEEL_NUMBERS.WN_5, 99],
        [WHEEL_NUMBERS.WN_6, 99],
        [WHEEL_NUMBERS.WN_7, 102],
        [WHEEL_NUMBERS.WN_8, 99],
        [WHEEL_NUMBERS.WN_9, 99],
        [WHEEL_NUMBERS.WN_10, 102],
        [WHEEL_NUMBERS.WN_11, 99],
        [WHEEL_NUMBERS.WN_12, 99],
        [WHEEL_NUMBERS.WN_13, 102],
        [WHEEL_NUMBERS.WN_14, 99],
        [WHEEL_NUMBERS.WN_15, 99],
        [WHEEL_NUMBERS.WN_16, 102],
        [WHEEL_NUMBERS.WN_17, 99],
        [WHEEL_NUMBERS.WN_18, 99],
        [WHEEL_NUMBERS.WN_19, 102],
        [WHEEL_NUMBERS.WN_20, 99],
        [WHEEL_NUMBERS.WN_21, 99],
        [WHEEL_NUMBERS.WN_22, 102],
        [WHEEL_NUMBERS.WN_23, 99],
        [WHEEL_NUMBERS.WN_24, 99],
        [WHEEL_NUMBERS.WN_25, 102],
        [WHEEL_NUMBERS.WN_26, 99],
        [WHEEL_NUMBERS.WN_27, 99],
        [WHEEL_NUMBERS.WN_28, 102],
        [WHEEL_NUMBERS.WN_29, 99],
        [WHEEL_NUMBERS.WN_30, 99],
        [WHEEL_NUMBERS.WN_31, 102],
        [WHEEL_NUMBERS.WN_32, 99],
        [WHEEL_NUMBERS.WN_33, 99],
        [WHEEL_NUMBERS.WN_34, 102],
        [WHEEL_NUMBERS.WN_35, 99],
        [WHEEL_NUMBERS.WN_36, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Second Column", () => {
    const betName = BET_NAMES.SECOND_COLUMN;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 99],
        [WHEEL_NUMBERS.WN_2, 102],
        [WHEEL_NUMBERS.WN_3, 99],
        [WHEEL_NUMBERS.WN_4, 99],
        [WHEEL_NUMBERS.WN_5, 102],
        [WHEEL_NUMBERS.WN_6, 99],
        [WHEEL_NUMBERS.WN_7, 99],
        [WHEEL_NUMBERS.WN_8, 102],
        [WHEEL_NUMBERS.WN_9, 99],
        [WHEEL_NUMBERS.WN_10, 99],
        [WHEEL_NUMBERS.WN_11, 102],
        [WHEEL_NUMBERS.WN_12, 99],
        [WHEEL_NUMBERS.WN_13, 99],
        [WHEEL_NUMBERS.WN_14, 102],
        [WHEEL_NUMBERS.WN_15, 99],
        [WHEEL_NUMBERS.WN_16, 99],
        [WHEEL_NUMBERS.WN_17, 102],
        [WHEEL_NUMBERS.WN_18, 99],
        [WHEEL_NUMBERS.WN_19, 99],
        [WHEEL_NUMBERS.WN_20, 102],
        [WHEEL_NUMBERS.WN_21, 99],
        [WHEEL_NUMBERS.WN_22, 99],
        [WHEEL_NUMBERS.WN_23, 102],
        [WHEEL_NUMBERS.WN_24, 99],
        [WHEEL_NUMBERS.WN_25, 99],
        [WHEEL_NUMBERS.WN_26, 102],
        [WHEEL_NUMBERS.WN_27, 99],
        [WHEEL_NUMBERS.WN_28, 99],
        [WHEEL_NUMBERS.WN_29, 102],
        [WHEEL_NUMBERS.WN_30, 99],
        [WHEEL_NUMBERS.WN_31, 99],
        [WHEEL_NUMBERS.WN_32, 102],
        [WHEEL_NUMBERS.WN_33, 99],
        [WHEEL_NUMBERS.WN_34, 99],
        [WHEEL_NUMBERS.WN_35, 102],
        [WHEEL_NUMBERS.WN_36, 99],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});

describe("Third Column", () => {
    const betName = BET_NAMES.THIRD_COLUMN;
    it.each([
        [WHEEL_NUMBERS.WN_0, 99],
        [WHEEL_NUMBERS.WN_00, 99],
        [WHEEL_NUMBERS.WN_1, 99],
        [WHEEL_NUMBERS.WN_2, 99],
        [WHEEL_NUMBERS.WN_3, 102],
        [WHEEL_NUMBERS.WN_4, 99],
        [WHEEL_NUMBERS.WN_5, 99],
        [WHEEL_NUMBERS.WN_6, 102],
        [WHEEL_NUMBERS.WN_7, 99],
        [WHEEL_NUMBERS.WN_8, 99],
        [WHEEL_NUMBERS.WN_9, 102],
        [WHEEL_NUMBERS.WN_10, 99],
        [WHEEL_NUMBERS.WN_11, 99],
        [WHEEL_NUMBERS.WN_12, 102],
        [WHEEL_NUMBERS.WN_13, 99],
        [WHEEL_NUMBERS.WN_14, 99],
        [WHEEL_NUMBERS.WN_15, 102],
        [WHEEL_NUMBERS.WN_16, 99],
        [WHEEL_NUMBERS.WN_17, 99],
        [WHEEL_NUMBERS.WN_18, 102],
        [WHEEL_NUMBERS.WN_19, 99],
        [WHEEL_NUMBERS.WN_20, 99],
        [WHEEL_NUMBERS.WN_21, 102],
        [WHEEL_NUMBERS.WN_22, 99],
        [WHEEL_NUMBERS.WN_23, 99],
        [WHEEL_NUMBERS.WN_24, 102],
        [WHEEL_NUMBERS.WN_25, 99],
        [WHEEL_NUMBERS.WN_26, 99],
        [WHEEL_NUMBERS.WN_27, 102],
        [WHEEL_NUMBERS.WN_28, 99],
        [WHEEL_NUMBERS.WN_29, 99],
        [WHEEL_NUMBERS.WN_30, 102],
        [WHEEL_NUMBERS.WN_31, 99],
        [WHEEL_NUMBERS.WN_32, 99],
        [WHEEL_NUMBERS.WN_33, 102],
        [WHEEL_NUMBERS.WN_34, 99],
        [WHEEL_NUMBERS.WN_35, 99],
        [WHEEL_NUMBERS.WN_36, 102],
    ])("wheel number %s -> ending balance %i", (wheelNumber, expectedBalance) => {
        const betAmounts = {
            [betName]: chipAmount,
        };

        const actual = getNewBalance(startingBalance, betAmounts, wheelNumber);

        expect(actual).toBe(expectedBalance);
    });
});
