import renderer from 'react-test-renderer';

import { CurrentBetsInfo } from '../../components/CurrentBetsInfo';

describe('CurrentBetsInfo', () => {
    it('renders with no bets', () => {
        const sut =
            CurrentBetsInfo({
                betsOnBoard: {},
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders with bets', () => {
        const sut =
            CurrentBetsInfo({
                betsOnBoard: {
                    "foo": 10,
                    "bar": 20,
                    "baz": 30,
                },
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
