import { getResultsOfBets } from './getResultsOfBets';

export const getCompleteResultsOfRound = (startingBalance, bets, winningWheelNumber) => {
    const totalBetAmount = Object.values(bets).reduce((acc, currentValue) => acc + currentValue, 0);

    const resultsOfBets = getResultsOfBets(bets, winningWheelNumber);

    const totalWinningsFromBets = Object.values(resultsOfBets).reduce((acc, betResult) => acc + betResult.winningsOnBet, 0);
    const totalBetAmountReturned = Object.values(resultsOfBets).reduce((acc, betResult) => acc + betResult.betReturned, 0);

    const finalBalance =
        startingBalance - totalBetAmount + totalWinningsFromBets + totalBetAmountReturned;

    return {
        startingBalance: startingBalance,
        finalBalance: finalBalance,
        betsPlaced: resultsOfBets,
        winningWheelNumber: winningWheelNumber,
    };
}
