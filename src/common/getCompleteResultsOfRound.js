import { getBetNameMultiplier } from "./getBetNameMultiplier";
import { getWinningCriteria } from "./getWinningCriteria";

// TODO I'm sure there's some performance improvements to be made here re: unnecessary looping...
export const getCompleteResultsOfRound = (startingBalance, bets, winningWheelNumber) => {
    const winningCriteria = getWinningCriteria(winningWheelNumber);

    const totalBetAmount =
        Object.values(bets).reduce((acc, currentValue) => acc + currentValue, 0);

    const resultsOfBets =
        Object.entries(bets).reduce((acc, [betName, betAmount]) => {
            acc[betName] = {
                betAmount,
                winningsOnBet: winningCriteria.has(betName) ? betAmount * getBetNameMultiplier(betName) : 0,
                betReturned: winningCriteria.has(betName) ? betAmount : 0,
            };
            return acc;
        }, {});

    const totalWinningsFromBets =
        Object.values(resultsOfBets).reduce((acc, betResult) => acc + betResult.winningsOnBet, 0);

    const totalBetAmountReturned =
        Object.values(resultsOfBets).reduce((acc, betResult) => acc + betResult.betReturned, 0);

    const finalBalance =
        startingBalance - totalBetAmount + totalWinningsFromBets + totalBetAmountReturned;

    return {
        startingBalance,
        resultsOfBets,
        winningWheelNumber,
        finalBalance,
    };
}
