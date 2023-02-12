import renderer from 'react-test-renderer';

import { Roulette } from '../../../components/roulette/Roulette';

describe('Roulette', () => {
    it('renders', () => {
        const view = renderer.create(<Roulette />);

        expect(view).toMatchSnapshot();
    });
});
