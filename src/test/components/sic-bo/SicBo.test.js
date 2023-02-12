import renderer from 'react-test-renderer';

import { SicBo } from '../../../components/sic-bo/SicBo';

describe('SicBo', () => {
    it('renders', () => {
        const view = renderer.create(<SicBo />);
        expect(view).toMatchSnapshot();
    });
});
