import renderer from 'react-test-renderer';

import { Roulette } from '../../components/Roulette';

describe('Roulette', () => {
    it('renders without props', () => {
        const sut = <Roulette />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
