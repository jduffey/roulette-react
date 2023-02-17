import renderer from 'react-test-renderer';

import { Board } from '../../../components/roulette/Board';
import { PendingBet } from '../../../common/PendingBet';

import { BET_NAMES } from '../../../common/betNames';

describe('Board', () => {
    it('renders with no bets placed', () => {
        const pendingBets = [];

        const sut =
            <Board
                pendingBets={pendingBets}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders with bets placed on all bet names', () => {
        const pendingBets = Object.values(BET_NAMES).map(betName => new PendingBet(betName, 1));

        const sut =
            <Board
                pendingBets={pendingBets}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
