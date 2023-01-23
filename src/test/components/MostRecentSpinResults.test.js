import renderer from 'react-test-renderer';

import { MostRecentSpinResults } from '../../components/MostRecentSpinResults';

describe('MostRecentSpinResults', () => {
    it.each([
        ["no spin results", []],
        ["multiple spin results", ["00", "1", "2"]],
    ])('renders when there are %s', (_description, spinResults) => {
        const sut =
            MostRecentSpinResults({
                spinResults: spinResults,
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
