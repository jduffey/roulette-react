import renderer from 'react-test-renderer';

import { HouseInfo } from '../../../components/roulette/HouseInfo';

describe('HouseInfo', () => {
    it.each([
        [undefined],
        [0],
        [123456.9876],
    ])('renders when houseBalance is %s', (houseBalance) => {
        const sut =
            <HouseInfo
                houseBalance={houseBalance}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
