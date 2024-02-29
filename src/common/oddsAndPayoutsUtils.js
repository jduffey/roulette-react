const oddsOfWinning = (numberOfWinningPossibilities, totalNumberOfPossibilities) => {
    if (totalNumberOfPossibilities <= 0) {
        throw new Error('Total number of possibilities must be greater than 0.');
    }
    const result = numberOfWinningPossibilities / totalNumberOfPossibilities;
    return result;
};

export { oddsOfWinning };