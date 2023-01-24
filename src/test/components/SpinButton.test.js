import renderer from 'react-test-renderer';

import { SpinButton } from '../../components/SpinButton';

describe('SpinButton', () => {
    it.each([
        [false],
        [true],
    ])('renders when isSpinAllowed is %s', (isSpinAllowed) => {
        const sut =
            SpinButton({
                isSpinAllowed: isSpinAllowed,
                onClick: () => { },
            });

        const actual = renderer.create(sut)

        expect(actual).toMatchSnapshot();
    });
});