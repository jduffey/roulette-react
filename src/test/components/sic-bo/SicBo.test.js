import renderer from 'react-test-renderer';

import { SicBo } from '../../../components/sic-bo/SicBo';

describe('SicBo', () => {
    it('renders', () => {
        const actual = renderer.create(<SicBo />);
        expect(actual).toMatchSnapshot();
    });
});