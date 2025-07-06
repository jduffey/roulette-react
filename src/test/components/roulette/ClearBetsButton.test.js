import renderer from 'react-test-renderer';

import { ClearBetsButton } from '../../../components/roulette/ClearBetsButton';
import { PendingBet } from '../../../common/PendingBet';

describe('ClearBetsButton', () => {
    it('renders enabled when there are bets and wheel is not spinning', () => {
        const sut =
            <ClearBetsButton
                onClick={() => {}}
                pendingBets={[new PendingBet("test", 10)]}
                wheelIsSpinning={false}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders disabled when there are no bets', () => {
        const sut =
            <ClearBetsButton
                onClick={() => {}}
                pendingBets={[]}
                wheelIsSpinning={false}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders disabled when wheel is spinning', () => {
        const sut =
            <ClearBetsButton
                onClick={() => {}}
                pendingBets={[new PendingBet("test", 10)]}
                wheelIsSpinning={true}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
}); 