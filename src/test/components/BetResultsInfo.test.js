import renderer from 'react-test-renderer';

import { BetResultsInfo } from '../../components/BetResultsInfo';

import { BET_NAMES } from '../../common/betNames';
import { WHEEL_NUMBERS } from '../../common/wheelNumbers';

describe('BetResultsInfo', () => {
    it('renders with no bets', () => {
        const sut =
            BetResultsInfo({
                bets: {},
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders with bets', () => {
        const sut =
            BetResultsInfo({
                bets: {
                    [BET_NAMES.EVEN]: 10,
                    [BET_NAMES.BLACK]: 20,
                    [BET_NAMES.FIRST_DOZEN]: 30,
                },
                winningWheelNumber: WHEEL_NUMBERS.WN_7,
                startingBalance: 1000,
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it.each([
        [WHEEL_NUMBERS.WN_0, 'green'],
        [WHEEL_NUMBERS.WN_1, 'red'],
        [WHEEL_NUMBERS.WN_2, 'black'],
        [undefined, 'generic grey'],
    ])('renders winning wheel numbers with different color backgrounds (%s -> %s)', (winningWheelNumber, _bgColor) => {
        const sut =
            BetResultsInfo({
                bets: {},
                winningWheelNumber,
                startingBalance: 1000,
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
