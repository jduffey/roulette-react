import renderer from 'react-test-renderer';

import { CurrentBetsInfo } from '../../../components/roulette/CurrentBetsInfo';
import { PendingBet } from '../../../common/PendingBet';

describe('CurrentBetsInfo', () => {
    it('renders with no bets', () => {
        const sut =
            CurrentBetsInfo({
                pendingBets: [],
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders with bets', () => {
        const sut =
            CurrentBetsInfo({
                pendingBets: [
                    new PendingBet("foo", 10),
                    new PendingBet("bar", 20),
                    new PendingBet("baz", 30),
                ],
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
