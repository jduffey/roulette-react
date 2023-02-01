import renderer from 'react-test-renderer';

import { WHEEL_NUMBERS } from '../../common/wheelNumbers';

import { NumbersHitTracker } from '../../components/NumbersHitTracker';

describe('NumbersHitTracker', () => {
    it('renders when there are no hit numbers', () => {
        const sut = NumbersHitTracker({
            transactionHistory: [],
        });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders when there all numbers have been hit', () => {
        const sut = NumbersHitTracker({
            transactionHistory: Object.values(WHEEL_NUMBERS).map((wheelNumber) => {
                return {
                    "spinResult": wheelNumber,
                };
            }),
        });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
