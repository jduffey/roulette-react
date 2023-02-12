import renderer from 'react-test-renderer';

import { SpinButton } from '../../../components/roulette/SpinButton';

describe('SpinButton', () => {
    it.each([
        [false],
        [true],
    ])('renders when isSpinAllowed is %s', (isSpinAllowed) => {
        const sut =
            SpinButton({
                isSpinAllowed,
                onClick: () => "ON_CLICK",
            });

        const view = renderer.create(sut)

        expect(view).toMatchSnapshot();
    });
});
