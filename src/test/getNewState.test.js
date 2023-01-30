import { getNewState } from "../common/getNewState";

import { BET_NAMES } from "../common/betNames";

describe("getNewState Individual Bets", () => {
    const startingBalance = 1000;
    const betAmount = 10;
    const winningWheelNumber = "0";

    it(`same bet on all options with winning wheel number being ${winningWheelNumber}`, () => {
        const bets = Object.values(BET_NAMES).reduce((acc, betName) => {
            acc[betName] = betAmount;
            return acc;
        }, {});

        const actual = getNewState(startingBalance, bets, winningWheelNumber);

        const expected = {
            startingBalance: startingBalance,
            betResults: Object.keys(bets).reduce((acc, betOption) => {
                acc[betOption] = {
                    "winnings": (betOption === "StraightUp_0") ? 350 : 0,
                    "betReturned": (betOption === "StraightUp_0") ? betAmount : 0,
                };
                return acc;
            }, {}),
            winningWheelNumber: winningWheelNumber,
            resultingBalance: startingBalance - (Object.keys(bets).length * betAmount) + (350 + betAmount),

        };

        expect(actual).toEqual(expected);
    });

    it("throw if bet name is not valid", () => {
        const bets = {
            "INVALID_BET_NAME": betAmount,
        };

        const action = () => getNewState(startingBalance, bets, winningWheelNumber);
        
        expect(action).toThrow("Invalid bet name");
    });
});
