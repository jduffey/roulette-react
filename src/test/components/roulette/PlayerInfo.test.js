import renderer from 'react-test-renderer';

import { PlayerInfo } from '../../../components/roulette/PlayerInfo';

describe('PlayerInfo', () => {
    it.each([
        [undefined, 0],
        [123456.354215, 56789], // locale-independent formatting now used
    ])('renders when playerBalance is %s and totalBetAmount is %s', (playerBalance, totalBetAmount) => {
        const sut =
            <PlayerInfo
                playerBalance={playerBalance}
                totalBetAmount={totalBetAmount}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
