import { getCompleteResultsOfRound } from "../common/getCompleteResultsOfRound";
import { BET_NAMES } from "../common/betNames";
import { WHEEL_NUMBERS } from "../common/wheelNumbers";

describe(`${getCompleteResultsOfRound.name}`, () => {
    it.each([
        [WHEEL_NUMBERS.WN_0, [BET_NAMES.STRAIGHT_UP_0]],
        [WHEEL_NUMBERS.WN_00, [BET_NAMES.STRAIGHT_UP_00]],
    ])("same bet on each option, spin result %s", (spinResult, expectedWinningBets) => {
        const startingBalance = 1000;
        const betAmount = 1;
        const bets = Object.values(BET_NAMES).reduce((accumulator, betName) => {
            accumulator[betName] = betAmount;
            return accumulator;
        }, {});
        const winningWheelNumber = spinResult;

        const actual = getCompleteResultsOfRound(startingBalance, bets, winningWheelNumber);

        const totalAmountBet = Object.keys(BET_NAMES).length * betAmount;
        const expected = {
            "startingBalance": startingBalance,
            "finalBalance": startingBalance - totalAmountBet + 35 + betAmount,
            "betsPlaced": Object.values(BET_NAMES).reduce((acc, betName) => {
                acc[betName] = { "betAmount": betAmount, "winningsOnBet": 0, "betReturned": 0 };
                return acc;
            }, {}),
            "winningWheelNumber": spinResult,
        };
        expectedWinningBets.forEach((betName) => {
            expected.betsPlaced[betName] = {
                "betAmount": betAmount,
                "winningsOnBet": 35,
                "betReturned": betAmount,
            };
        });

        expect(actual).toStrictEqual(expected);
    });
});
