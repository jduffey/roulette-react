const oddsOfWinning = (numberOfWinningPossibilities, totalNumberOfPossibilities) => {
    if (totalNumberOfPossibilities <= 0) {
        throw new Error('Total number of possibilities must be a positive number.');
    }
    if (numberOfWinningPossibilities <= 0) {
        throw new Error('Number of winning possibilities must be a positive number.');
    }
    const result = numberOfWinningPossibilities / totalNumberOfPossibilities;
    return result;
};

export { oddsOfWinning };