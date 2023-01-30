// import { getWinningCriteria } from './getWinningCriteria';
import { getResultsOfBets } from './getResultsOfBets';

export const getCompleteResultsOfRound = (startingBalance, bets, winningWheelNumber) => {
    // const winningCriteria = getWinningCriteria(winningWheelNumber);
    const resultsOfBets = getResultsOfBets(bets, winningWheelNumber);
    const finalBalance = startingBalance + Object.values(resultsOfBets).reduce((accumulator, currentValue) => accumulator + currentValue.winningsOnBet, 0);

    return {
        startingBalance: startingBalance,
        finalBalance: finalBalance,
        betsPlaced: resultsOfBets,
        winningWheelNumber: winningWheelNumber,
    };
}
