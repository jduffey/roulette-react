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

    it('returns 1 when there are two complete sets of spin results out of order', () => {
        const transactionHistory = [
            { spinResult: '00' }, { spinResult: '1' }, { spinResult: '2' },
            { spinResult: '3' }, { spinResult: '4' }, { spinResult: '5' },
            { spinResult: '6' }, { spinResult: '7' }, { spinResult: '8' },
            { spinResult: '9' }, { spinResult: '10' }, { spinResult: '11' },
            { spinResult: '12' }, { spinResult: '13' }, { spinResult: '14' },
            { spinResult: '15' }, { spinResult: '16' }, { spinResult: '17' },
            { spinResult: '18' }, { spinResult: '19' }, { spinResult: '20' },
            { spinResult: '21' }, { spinResult: '22' }, { spinResult: '23' },
            { spinResult: '24' }, { spinResult: '25' }, { spinResult: '26' },
            { spinResult: '27' }, { spinResult: '28' }, { spinResult: '29' },
            { spinResult: '30' }, { spinResult: '31' }, { spinResult: '32' },
            { spinResult: '33' }, { spinResult: '34' }, { spinResult: '35' },

            { spinResult: '0' }, { spinResult: '36' }, // these two are "out of order"

            { spinResult: '00' },
            { spinResult: '1' }, { spinResult: '2' }, { spinResult: '3' },
            { spinResult: '4' }, { spinResult: '5' }, { spinResult: '6' },
            { spinResult: '7' }, { spinResult: '8' }, { spinResult: '9' },
            { spinResult: '10' }, { spinResult: '11' }, { spinResult: '12' },
            { spinResult: '13' }, { spinResult: '14' }, { spinResult: '15' },
            { spinResult: '16' }, { spinResult: '17' }, { spinResult: '18' },
            { spinResult: '19' }, { spinResult: '20' }, { spinResult: '21' },
            { spinResult: '22' }, { spinResult: '23' }, { spinResult: '24' },
            { spinResult: '25' }, { spinResult: '26' }, { spinResult: '27' },
            { spinResult: '28' }, { spinResult: '29' }, { spinResult: '30' },
            { spinResult: '31' }, { spinResult: '32' }, { spinResult: '33' },
            { spinResult: '34' }, { spinResult: '35' }, { spinResult: '36' },
        ]

        const actual = getCompletedSets(transactionHistory);

        expect(actual).toBe(1);
    });

    it('returns 2 when there are two complete sets of spin results in order overall but with some out of order', () => {
        const transactionHistory = [
            { spinResult: '00' }, { spinResult: '1' }, { spinResult: '2' },
            { spinResult: '3' }, { spinResult: '4' }, { spinResult: '5' },
            { spinResult: '6' }, { spinResult: '7' }, { spinResult: '8' },
            { spinResult: '9' }, { spinResult: '10' }, { spinResult: '11' },
            { spinResult: '12' }, { spinResult: '13' }, { spinResult: '14' },
            { spinResult: '15' }, { spinResult: '16' }, { spinResult: '17' },
            { spinResult: '18' }, { spinResult: '19' }, { spinResult: '20' },
            { spinResult: '21' }, { spinResult: '22' }, { spinResult: '23' },
            { spinResult: '24' }, { spinResult: '25' }, { spinResult: '26' },
            { spinResult: '27' }, { spinResult: '28' }, { spinResult: '29' },
            { spinResult: '30' }, { spinResult: '31' }, { spinResult: '32' },
            { spinResult: '33' }, { spinResult: '34' }, { spinResult: '35' },

            { spinResult: '0' }, { spinResult: '36' }, // these two are "out of order"

            { spinResult: '00' },
            { spinResult: '1' }, { spinResult: '2' }, { spinResult: '3' },
            { spinResult: '4' }, { spinResult: '5' }, { spinResult: '6' },
            { spinResult: '7' }, { spinResult: '8' }, { spinResult: '9' },
            { spinResult: '10' }, { spinResult: '11' }, { spinResult: '12' },
            { spinResult: '13' }, { spinResult: '14' }, { spinResult: '15' },
            { spinResult: '16' }, { spinResult: '17' }, { spinResult: '18' },
            { spinResult: '19' }, { spinResult: '20' }, { spinResult: '21' },
            { spinResult: '22' }, { spinResult: '23' }, { spinResult: '24' },
            { spinResult: '25' }, { spinResult: '26' }, { spinResult: '27' },
            { spinResult: '28' }, { spinResult: '29' }, { spinResult: '30' },
            { spinResult: '31' }, { spinResult: '32' }, { spinResult: '33' },
            { spinResult: '34' }, { spinResult: '35' }, { spinResult: '36' },
            { spinResult: '0' }, // this one completes the second set
        ]

        const actual = getCompletedSets(transactionHistory);

        expect(actual).toBe(2);
    });
});
