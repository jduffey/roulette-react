import { oddsOfWinning } from '../../common/oddsAndPayoutsUtils';

describe('oddsAndPayoutsUtils', () => {
    it.each([
        [49, 100, 0.49],
        [1, 2, 0.5]
    ])('calculates odds of winning returns odds', (numberOfWinningPossibilities, totalNumberOfPossibilities, expected) => {
        const actual = oddsOfWinning(numberOfWinningPossibilities, totalNumberOfPossibilities);

        expect(actual).toBe(expected);
    });
});