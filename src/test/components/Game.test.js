import renderer from 'react-test-renderer';

import { Game } from '../../components/Game';

describe('Game', () => {
    it('renders without props', () => {
        const sut = <Game />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
