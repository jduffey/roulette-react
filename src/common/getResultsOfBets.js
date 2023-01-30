import { getWinningCriteria } from "./getWinningCriteria";
import { getBetNameMultiplier } from "./getBetNameMultiplier";

export function getResultsOfBets(bets, winningWheelNumber) {
    // console.log("bets", bets);
    // console.log("winningWheelNumber", winningWheelNumber);
    const winningCriteria = getWinningCriteria(winningWheelNumber);

    const resultsOfBets = {};
    for (const betOption in bets) {
        const betAmount = bets[betOption];
        const multiplier = getBetNameMultiplier(betOption);
        const winningsOnBet = winningCriteria.has(betOption) ?
            betAmount * multiplier :
            0;
        const betReturned = winningsOnBet ? betAmount : 0;

        resultsOfBets[betOption] = {
            betAmount: betAmount,
            winningsOnBet: winningsOnBet,
            betReturned: betReturned,
        };
    }

    // console.log("winningsOnBets", resultsOfBets);
    return resultsOfBets;
}
