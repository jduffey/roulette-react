import { BET_NAMES } from "../common/betNames";
import { WHEEL_NUMBERS } from "../common/wheelNumbers";

import { getCompleteResultsOfRound } from "../common/getCompleteResultsOfRound";
import { getBetNameMultiplier } from "../common/getBetNameMultiplier";

describe(`${getCompleteResultsOfRound.name}`, () => {
    it.each([
        [WHEEL_NUMBERS.WN_0, [BET_NAMES.STRAIGHT_UP_0], -14],
        [WHEEL_NUMBERS.WN_00, [BET_NAMES.STRAIGHT_UP_00], -14],
        [WHEEL_NUMBERS.WN_1, [BET_NAMES.STRAIGHT_UP_1, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_2, [BET_NAMES.STRAIGHT_UP_2, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_3, [BET_NAMES.STRAIGHT_UP_3, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_4, [BET_NAMES.STRAIGHT_UP_4, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_5, [BET_NAMES.STRAIGHT_UP_5, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_6, [BET_NAMES.STRAIGHT_UP_6, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_7, [BET_NAMES.STRAIGHT_UP_7, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_8, [BET_NAMES.STRAIGHT_UP_8, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_9, [BET_NAMES.STRAIGHT_UP_9, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_10, [BET_NAMES.STRAIGHT_UP_10, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_11, [BET_NAMES.STRAIGHT_UP_11, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_12, [BET_NAMES.STRAIGHT_UP_12, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_13, [BET_NAMES.STRAIGHT_UP_13, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_14, [BET_NAMES.STRAIGHT_UP_14, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_15, [BET_NAMES.STRAIGHT_UP_15, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_16, [BET_NAMES.STRAIGHT_UP_16, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_17, [BET_NAMES.STRAIGHT_UP_17, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_18, [BET_NAMES.STRAIGHT_UP_18, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_19, [BET_NAMES.STRAIGHT_UP_19, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_20, [BET_NAMES.STRAIGHT_UP_20, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_21, [BET_NAMES.STRAIGHT_UP_21, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_22, [BET_NAMES.STRAIGHT_UP_22, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_23, [BET_NAMES.STRAIGHT_UP_23, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_24, [BET_NAMES.STRAIGHT_UP_24, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_25, [BET_NAMES.STRAIGHT_UP_25, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_26, [BET_NAMES.STRAIGHT_UP_26, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_27, [BET_NAMES.STRAIGHT_UP_27, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_28, [BET_NAMES.STRAIGHT_UP_28, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_29, [BET_NAMES.STRAIGHT_UP_29, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_30, [BET_NAMES.STRAIGHT_UP_30, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_31, [BET_NAMES.STRAIGHT_UP_31, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_32, [BET_NAMES.STRAIGHT_UP_32, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_33, [BET_NAMES.STRAIGHT_UP_33, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN], -2],
        [WHEEL_NUMBERS.WN_34, [BET_NAMES.STRAIGHT_UP_34, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN], -2],
        [WHEEL_NUMBERS.WN_35, [BET_NAMES.STRAIGHT_UP_35, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN], -2],
        [WHEEL_NUMBERS.WN_36, [BET_NAMES.STRAIGHT_UP_36, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN], -2],
    ])("same bet on each option, spin result %s", (spinResult, expectedWinningBets, expectedNetDifferenceInBalance) => {
        const startingBalance = 1000;
        const betAmount = 1;
        const bets = Object.values(BET_NAMES).reduce((acc, betName) => {
            acc[betName] = betAmount;
            return acc;
        }, {});

        const actual = getCompleteResultsOfRound(startingBalance, bets, spinResult);

        const expected = {
            startingBalance: startingBalance,
            finalBalance: startingBalance + expectedNetDifferenceInBalance,
            betsPlaced: Object.values(BET_NAMES).reduce((acc, betName) => {
                acc[betName] = {
                    betAmount: betAmount,
                    winningsOnBet: 0,
                    betReturned: 0,
                };
                return acc;
            }, {}),
            winningWheelNumber: spinResult,
        };
        expectedWinningBets.forEach((betName) => {
            expected.betsPlaced[betName].winningsOnBet = getBetNameMultiplier(betName) * betAmount;
            expected.betsPlaced[betName].betReturned = betAmount;
        });

        expect(actual).toStrictEqual(expected);
    });
});
