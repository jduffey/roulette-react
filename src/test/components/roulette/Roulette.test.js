import renderer from 'react-test-renderer';

import { Roulette } from '../../../components/roulette/Roulette';

describe('Roulette', () => {
    it('renders', () => {
        const actual = renderer.create(<Roulette />);

        expect(actual).toMatchSnapshot();
    });
});