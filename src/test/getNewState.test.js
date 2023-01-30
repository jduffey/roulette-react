import { getNewState } from "../common/getNewState";
import { getRandomWheelNumber } from "../common/getRandomWheelNumber";

import { BET_NAMES } from "../common/betNames";

const greenWheelNumbers = ["0", "00"];
const redWheelNumbers = ["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"];
const blackWheelNumbers = ["2", "4", "6", "8", "10", "11", "13", "15", "17", "20", "22", "24", "26", "28", "29", "31", "33", "35"];

describe("getNewState -- same bet placed on all options", () => {
    const startingBalance = 1000;
    const betAmount = 10;

    it.each([
        ["0"],
        ["00"],
    ])("when winning wheel number is green -> %s", (winningWheelNumber) => {
        const bets = Object.values(BET_NAMES).reduce((acc, betName) => {
            acc[betName] = betAmount;
            return acc;
        }, {});

        const actual = getNewState(startingBalance, bets, winningWheelNumber);

        const expected = {
            startingBalance: startingBalance,
            betsPlaced: bets,
            winningWheelNumber: winningWheelNumber,
            resultingBalance: startingBalance - (Object.keys(bets).length * betAmount) + (350 + betAmount),
        };

        expect(actual).toEqual(expected);
    });

    const redAndBlack = [...redWheelNumbers, ...blackWheelNumbers].map((wheelNumber) => [wheelNumber]);
    console.log("redAndBlack", redAndBlack);

    const winningWheelNumber = "0";
    console.log("winningWheelNumber", winningWheelNumber);

    it.each([
        ...redAndBlack,
    ])("when winning wheel number is green -> %s", (winningWheelNumber) => {
        const bets = Object.values(BET_NAMES).reduce((acc, betName) => {
            acc[betName] = betAmount;
            return acc;
        }, {});

        const actual = getNewState(startingBalance, bets, winningWheelNumber);

        const expected = {
            startingBalance: startingBalance,
            betsPlaced: bets,
            winningWheelNumber: winningWheelNumber,
            resultingBalance: startingBalance - (Object.keys(bets).length * betAmount) + (350 + betAmount) + 120, // TODO why 120? how to better describe this
        };

        expect(actual).toEqual(expected);
    });



    // it(`same bet on all options with winning wheel number being ${winningWheelNumber}`, () => {
    //     const bets = Object.values(BET_NAMES).reduce((acc, betName) => {
    //         acc[betName] = betAmount;
    //         return acc;
    //     }, {});

    //     const actual = getNewState(startingBalance, bets, winningWheelNumber);

    //     const expected = {
    //         startingBalance: startingBalance,
    //         betsPlaced: bets,
    //         winningWheelNumber: winningWheelNumber,
    //         resultingBalance: startingBalance - (Object.keys(bets).length * betAmount) + (350 + betAmount),
    //     };

    //     expect(actual).toEqual(expected);
    // });

    it("throw if bet name is not valid", () => {
        const bets = {
            "INVALID_BET_NAME": betAmount,
        };

        const action = () => getNewState(startingBalance, bets, winningWheelNumber);

        expect(action).toThrow("Invalid bet name");
    });
});
