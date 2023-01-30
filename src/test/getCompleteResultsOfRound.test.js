import { getCompleteResultsOfRound } from "../common/getCompleteResultsOfRound";
import { BET_NAMES } from "../common/betNames";

describe(`${getCompleteResultsOfRound.name}`, () => {
    it("first test with all bet options placed", () => {
        const startingBalance = 1000;
        const bets = Object.values(BET_NAMES).reduce((accumulator, betName) => {
            accumulator[betName] = 0;
            return accumulator;
        }, {});
        bets["StraightUp_24"] = 1;
        const winningWheelNumber = "24";

        const actual = getCompleteResultsOfRound(startingBalance, bets, winningWheelNumber);

        const expected = {
            "startingBalance": 1000,
            "finalBalance": 1035,
            "betsPlaced": Object.values(BET_NAMES).reduce((acc, betName) => {
                acc[betName] = { "betAmount": 0, "winningsOnBet": 0, "betReturned": 0 };
                return acc;
            }, {}),
            "winningWheelNumber": "24",
        };
        expected.betsPlaced["StraightUp_24"] = { "betAmount": 1, "winningsOnBet": 35, "betReturned": 1 };

        expect(actual).toStrictEqual(expected);
    });



    // it("first test", () => {
    //     const startingBalance = 1000;
    //     const bets = {
    //         "Even": 1,
    //         "Odd": 1,
    //         "StraightUp_00": 1,
    //         "StraightUp_24": 1,
    //     };
    //     const winningWheelNumber = "24";

    //     const actual = getCompleteResultsOfRound(startingBalance, bets, winningWheelNumber);

    //     const expected = {
    //         "startingBalance": 1000,
    //         "finalBalance": 1036,
    //         "betsPlaced": {
    //             "Even": { "betAmount": 1, "winningsOnBet": 1, "betReturned": 1 },
    //             "Odd": { "betAmount": 1, "winningsOnBet": 0, "betReturned": 0 },
    //             "StraightUp_00": { "betAmount": 1, "winningsOnBet": 0, "betReturned": 0 },
    //             "StraightUp_24": { "betAmount": 1, "winningsOnBet": 35, "betReturned": 1 },
    //         },
    //         "winningWheelNumber": "24",
    //     }
    //     expect(actual).toStrictEqual(expected);
    // });

    // it("second test", () => {
    //     const startingBalance = 1000;
    //     const bets = {
    //         "Even": 1,
    //         "Odd": 1,
    //         "StraightUp_00": 1,
    //         "StraightUp_24": 1,
    //     };
    //     const winningWheelNumber = "24";

    //     const actual = getCompleteResultsOfRound(startingBalance, bets, winningWheelNumber);

    //     const expected = {
    //         "startingBalance": 1000,
    //         "finalBalance": 1036,
    //         "betsPlaced": {
    //             "Even": { "betAmount": 1, "winningsOnBet": 1, "betReturned": 1 },
    //             "Odd": { "betAmount": 1, "winningsOnBet": 0, "betReturned": 0 },
    //             "StraightUp_00": { "betAmount": 1, "winningsOnBet": 0, "betReturned": 0 },
    //             "StraightUp_24": { "betAmount": 1, "winningsOnBet": 35, "betReturned": 1 },
    //         },
    //         "winningWheelNumber": "24",
    //     }
    //     expect(actual).toStrictEqual(expected);
    // });
});
