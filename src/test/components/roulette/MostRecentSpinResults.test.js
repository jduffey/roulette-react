import renderer from 'react-test-renderer';

import { MostRecentSpinResults } from '../../../components/roulette/MostRecentSpinResults';

describe('MostRecentSpinResults', () => {
    it('renders', () => {
        const sut =
            <MostRecentSpinResults
                playerAddress="0x1234567890123456789012345678901234567890"
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    // TODO test for when there are actually spin results
    // Look at https://stackoverflow.com/questions/54892546/unit-testing-jest-in-reactjs-component-state
});
