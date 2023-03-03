import renderer from 'react-test-renderer';

import { NumbersHitTracker } from '../../../components/roulette/NumbersHitTracker';

describe('NumbersHitTracker', () => {
    it('renders', () => {
        const sut =
            <NumbersHitTracker
                playerAddress="foo"
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
