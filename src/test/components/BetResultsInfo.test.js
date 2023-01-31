import renderer from 'react-test-renderer';

import { BetResultsInfo } from '../../components/BetResultsInfo';

import { BET_NAMES } from '../../common/betNames';
import { WHEEL_NUMBERS } from '../../common/wheelNumbers';

const DUMMY_VALUE = -999;

describe('BetResultsInfo', () => {
    it('renders when previousRoundResults is null', () => {
        const sut =
            BetResultsInfo({
                previousRoundResults: null,
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders with bets', () => {
        const previousRoundResults = {
            startingBalance: 1000,
            resultsOfBets: Object.values(BET_NAMES).reduce((acc, betName) => {
                acc[betName] = {
                    betAmount: DUMMY_VALUE,
                    winningsOnBet: DUMMY_VALUE,
                    betReturned: DUMMY_VALUE,
                };
                return acc;
            }, {}),
            winningWheelNumber: WHEEL_NUMBERS.WN_0,
            finalBalance: 986
        }

        const sut =
            BetResultsInfo({
                previousRoundResults,
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it.each([
        [WHEEL_NUMBERS.WN_0, 'green'],
        [WHEEL_NUMBERS.WN_1, 'red'],
        [WHEEL_NUMBERS.WN_2, 'black'],
    ])('renders winning wheel numbers with different color backgrounds (%s -> %s)', (winningWheelNumber, _bgColor) => {
        const sut =
            BetResultsInfo({
                previousRoundResults: {
                    startingBalance: DUMMY_VALUE,
                    resultsOfBets: { StraightUp_0: { betAmount: DUMMY_VALUE, winningsOnBet: DUMMY_VALUE, betReturned: DUMMY_VALUE } },
                    winningWheelNumber,
                    finalBalance: DUMMY_VALUE,

                },
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
