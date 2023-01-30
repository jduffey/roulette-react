import { getBetNameMultiplier } from "../common/getBetNameMultiplier";
import { getWinningCriteria } from "../common/getWinningCriteria";

export function getBetResults(startingBalance, bets, winningWheelNumber) {

    const betResults = Object.keys(bets).reduce((acc, betOption) => {
        const multiplier = getBetNameMultiplier(betOption);
        const betAmount = bets[betOption];
        const winningsOnBet = getWinningCriteria(winningWheelNumber).has(betOption) ? betAmount * multiplier : 0;

        acc[betOption] = {
            winnings: winningsOnBet,
            betReturned: winningsOnBet ? betAmount : 0,
        };

        return acc;
    }, {});

    const totalBetAmount = Object.values(bets).reduce((acc, betAmount) => {
        return acc + betAmount;
    }, 0);

    const winningsPlusBetsReturned =
        Object.values(betResults).reduce((acc, betResult) => {
            return acc + betResult.winnings + betResult.betReturned;
        }, 0);

    const result = {
        startingBalance: startingBalance,
        betResults: betResults,
        winningWheelNumber: winningWheelNumber,
        resultingBalance: startingBalance - totalBetAmount + winningsPlusBetsReturned,
    };

    return result;
}
