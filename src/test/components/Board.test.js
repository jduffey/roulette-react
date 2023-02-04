import renderer from 'react-test-renderer';

import { Board } from '../../components/roulette/Board';

import { BET_NAMES } from '../../common/betNames';

describe('Board', () => {
    it('renders with no bets placed', () => {
        const betsOnBoard = {};

        const sut =
            <Board
                betsOnBoard={betsOnBoard}
            />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders with bets placed on all bet names', () => {
        const betsOnBoard = Object.values(BET_NAMES).reduce((acc, betName) => {
            acc[betName] = 1;
            return acc;
        }, {});

        const sut =
            <Board
                betsOnBoard={betsOnBoard}
            />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
