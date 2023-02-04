import renderer from 'react-test-renderer';

import { Roulette } from '../../components/Roulette';

describe('Roulette', () => {
    it('renders', () => {
        const actual = renderer.create(<Roulette />);

        expect(actual).toMatchSnapshot();
    });
});
