import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { Roulette } from '../../components/Roulette';

describe('Roulette', () => {
    it('renders', () => {
        const actual = renderer.create(
            <MemoryRouter>
                <Roulette />
            </MemoryRouter>
        );

        expect(actual).toMatchSnapshot();
    });
});
