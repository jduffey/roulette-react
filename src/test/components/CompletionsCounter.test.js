import renderer from 'react-test-renderer';

import { WHEEL_NUMBERS } from '../../common/wheelNumbers';

import { CompletionsCounter } from '../../components/roulette/CompletionsCounter';

describe('CompletionsCounter', () => {
    it('renders when there are no completions', () => {
        const sut = CompletionsCounter({
            transactionHistory: [],
        });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders when all numbers have been hit once', () => {
        const sut = CompletionsCounter({
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
