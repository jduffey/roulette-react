import { oddsOfWinning } from '../../common/oddsAndPayoutsUtils';

describe('oddsAndPayoutsUtils', () => {
    it.each([
        [49, 100, 0.49],
        [1, 2, 0.5]
    ])('calculates odds of winning returns odds', (numberOfWinningPossibilities, totalNumberOfPossibilities, expected) => {
        const actual = oddsOfWinning(numberOfWinningPossibilities, totalNumberOfPossibilities);

        expect(actual).toBe(expected);
    });

    it('throws error if total number of possibilities is 0', () => {
        const numberOfWinningPossibilities = Math.random() * 1000;
        const totalNumberOfPossibilities = 0;

        expect(() => oddsOfWinning(numberOfWinningPossibilities, totalNumberOfPossibilities))
            .toThrow('Total number of possibilities must be greater than 0.');
    });

    it('throws error if total number of possibilities is negative', () => {
        const numberOfWinningPossibilities = Math.random() * 1000;
        const totalNumberOfPossibilities = -1;

        expect(() => oddsOfWinning(numberOfWinningPossibilities, totalNumberOfPossibilities))
            .toThrow('Total number of possibilities must be greater than 0.');
    });
});