import renderer from 'react-test-renderer';

import { PlayerInfo } from '../../components/PlayerInfo';

describe('PlayerInfo', () => {
    it.each([
        ["foo", "bar"], // TODO shouldn't pass non-numeric values but still renders for now
        [123456, 56789], // TODO this test will fail if run in an environment with a different locale (e.g. using a period for thousands separator)
    ])('renders when availableBalance is %s and totalBetAmount is %s', (availableBalance, totalBetAmount) => {
        const sut =
            <PlayerInfo
                availableBalance={availableBalance}
                totalBetAmount={totalBetAmount}
            />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
