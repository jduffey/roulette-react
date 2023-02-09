import renderer from 'react-test-renderer';

import { PendingBetsTable } from '../../../components/roulette/PendingBetsTable';
import { PendingBet } from '../../../common/PendingBet';

describe('PendingBetsTable', () => {
    it('renders with no bets', () => {
        const sut =
            PendingBetsTable({
                pendingBets: [],
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders with bets', () => {
        const sut =
            PendingBetsTable({
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
