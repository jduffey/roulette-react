import { oddsOfWinning } from '../../common/oddsAndPayoutsUtils';

describe('oddsAndPayoutsUtils', () => {
    it.each([
        [49, 100, 0.49],
        [1, 2, 0.5],
    ])('calculates odds of winning returns odds', (numberOfWinningPossibilities, totalNumberOfPossibilities, expected) => {
        const actual = oddsOfWinning(numberOfWinningPossibilities, totalNumberOfPossibilities);

        expect(actual).toBe(expected);
    });

    it.each([
        [0],
        [-1]
    ])('throws if number of possibilities not a positive number', (numberOfWinningPossibilities) => {
        const totalNumberOfPossibilities = Math.random() * 1000;

        expect(() => oddsOfWinning(numberOfWinningPossibilities, totalNumberOfPossibilities))
            .toThrow('Number of winning possibilities must be a positive number.');
    });

    it.each([
        [0],
        [-1]
    ])('throws if total number of possibilities is not a positive number', (totalNumberOfPossibilities) => {
        const numberOfWinningPossibilities = Math.random() * 1000;

        const action = () => oddsOfWinning(numberOfWinningPossibilities, totalNumberOfPossibilities);

        expect(action).toThrow('Total number of possibilities must be a positive number.');
    });
});