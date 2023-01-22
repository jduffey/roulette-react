import { getWinningCriteria } from "./getWinningCriteria";
import { getBetNameMultiplier } from "./getBetNameMultiplier";

export const getNewBalance = (startingBalance, betAmounts, wheelNumber) => {

    const placedBetAmounts = Object.values(betAmounts).reduce((acc, betAmount) => acc + betAmount, 0);

    const winningCriteria = getWinningCriteria(wheelNumber);

    const betNamesThatPlayerWon = Object.keys(betAmounts).filter((betName) => winningCriteria.has(betName));

    const winnings = betNamesThatPlayerWon.reduce((acc, betName) => {
        const multiplier = getBetNameMultiplier(betName);
        const betAmount = betAmounts[betName];
        return acc + (betAmount * multiplier);
    }, 0);

    const returnedBets = betNamesThatPlayerWon.reduce((acc, betName) => {
        const betAmount = betAmounts[betName];
        return acc + betAmount;
    }, 0);

    const newBalance = startingBalance - placedBetAmounts + winnings + returnedBets;

    return newBalance;
}
