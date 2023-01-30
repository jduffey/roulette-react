import { getResultsOfBets } from "../common/getResultsOfBets";

describe(`${getResultsOfBets.name}`, () => {
    it("initial test", () => {
        const bets = {
            "Even": 1,
            "Odd": 1,
            "StraightUp_00": 1,
            "StraightUp_24": 1,
        };
        const winningWheelNumber = "24";

        const actual = getResultsOfBets(bets, winningWheelNumber);

        const expected = {
            "Even": { "betAmount": 1, "winningsOnBet": 1, "betReturned": 1 },
            "Odd": { "betAmount": 1, "winningsOnBet": 0, "betReturned": 0 },
            "StraightUp_00": { "betAmount": 1, "winningsOnBet": 0, "betReturned": 0 },
            "StraightUp_24": { "betAmount": 1, "winningsOnBet": 35, "betReturned": 1 },
        }
        expect(actual).toStrictEqual(expected);
    });
});
