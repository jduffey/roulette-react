import { getCompletedSets } from '../common/getCompletedSets';
import { WHEEL_NUMBERS } from '../common/wheelNumbers';

describe('getCompletedSets', () => {
    it('returns 0 when there are no spin results', () => {
        const transactionHistory = [];

        const actual = getCompletedSets(transactionHistory);

        expect(actual).toBe(0);
    });

    it('returns 0 when there is only one spin result', () => {
        const transactionHistory =
            [
                {
                    "startingBalance": 10000,
                    "betsPlaced": {
                        "19 to 36": 1
                    },
                    "spinResult": "27",
                    "finalBalance": 10001
                },
            ];

        const actual = getCompletedSets(transactionHistory);

        expect(actual).toBe(0);
    });

    it('returns 1 when there is one complete set of spin results', () => {
        const transactionHistoryWithAllResultsOnce = Array.from(Object.values(WHEEL_NUMBERS)).map((wheelNumber) => {
            return {
                "spinResult": wheelNumber,
            };
        });

        const actual = getCompletedSets(transactionHistoryWithAllResultsOnce);

        expect(actual).toBe(1);
    });

    it('returns 2 when there are two complete sets of spin results in order', () => {
        const transactionHistoryWithAllResultsOnce = Array.from(Object.values(WHEEL_NUMBERS)).map((wheelNumber) => {
            return {
                "spinResult": wheelNumber,
            };
        });

        const transactionHistoryWithAllResultsTwice = transactionHistoryWithAllResultsOnce.concat(transactionHistoryWithAllResultsOnce);

        const actual = getCompletedSets(transactionHistoryWithAllResultsTwice);

        expect(actual).toBe(2);
    });

});
