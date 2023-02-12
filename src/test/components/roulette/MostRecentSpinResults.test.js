import renderer from 'react-test-renderer';

import { MostRecentSpinResults } from '../../../components/roulette/MostRecentSpinResults';

describe('MostRecentSpinResults', () => {
    it.each([
        ["no spin results", []],
        ["multiple spin results", ["00", "1", "2"]],
        ["more spin results than will be displayed", ["0", "00", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]],
    ])('renders when there are %s', (_description, spinResults) => {
        const sut =
            MostRecentSpinResults({
                spinResults,
            });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
