import { getNewState } from "../common/getNewState";

describe("getNewState Individual Bets", () => {
    const startingBalance = 1000;
    const betAmount = 10;
    const winningWheelNumber = "0";

    it(`same bet on all options with winning wheel number being ${winningWheelNumber}`, () => {
        const bets = {
            "StraightUp_0": betAmount,
            "StraightUp_00": betAmount,
            "StraightUp_1": betAmount,
            "StraightUp_2": betAmount,
            "StraightUp_3": betAmount,
            "StraightUp_4": betAmount,
            "StraightUp_5": betAmount,
            "StraightUp_6": betAmount,
            "StraightUp_7": betAmount,
            "StraightUp_8": betAmount,
            "StraightUp_9": betAmount,
            "StraightUp_10": betAmount,
            "StraightUp_11": betAmount,
            "StraightUp_12": betAmount,
            "StraightUp_13": betAmount,
            "StraightUp_14": betAmount,
            "StraightUp_15": betAmount,
            "StraightUp_16": betAmount,
            "StraightUp_17": betAmount,
            "StraightUp_18": betAmount,
            "StraightUp_19": betAmount,
            "StraightUp_20": betAmount,
            "StraightUp_21": betAmount,
            "StraightUp_22": betAmount,
            "StraightUp_23": betAmount,
            "StraightUp_24": betAmount,
            "StraightUp_25": betAmount,
            "StraightUp_26": betAmount,
            "StraightUp_27": betAmount,
            "StraightUp_28": betAmount,
            "StraightUp_29": betAmount,
            "StraightUp_30": betAmount,
            "StraightUp_31": betAmount,
            "StraightUp_32": betAmount,
            "StraightUp_33": betAmount,
            "StraightUp_34": betAmount,
            "StraightUp_35": betAmount,
            "StraightUp_36": betAmount,
            "1st 12": betAmount,
            "2nd 12": betAmount,
            "3rd 12": betAmount,
            "1 to 18": betAmount,
            "Even": betAmount,
            "Red": betAmount,
            "Black": betAmount,
            "Odd": betAmount,
            "19 to 36": betAmount,
            "1st Column": betAmount,
            "2nd Column": betAmount,
            "3rd Column": betAmount,
        };

        const actual = getNewState(startingBalance, bets, winningWheelNumber);

        const expected = {
            resultingBalance: startingBalance - (Object.keys(bets).length * betAmount) + (350 + betAmount),
            betResults: Object.keys(bets).reduce((acc, betOption) => {
                acc[betOption] = {
                    "winnings": (betOption === "StraightUp_0") ? 350 : 0,
                    "betReturned": (betOption === "StraightUp_0") ? betAmount : 0,
                };
                return acc;
            }, {}),

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
