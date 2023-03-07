import renderer from 'react-test-renderer';

import { SpinButton } from '../../../components/roulette/SpinButton';

describe('SpinButton', () => {
    it.each([
        [false, false],
        [true, false],
        [false, true],
        [true, true],
    ])('renders when: hasABetBeenPlaced is %s, wheelIsSpinning is %s', (hasABetBeenPlaced, wheelIsSpinning) => {
        const sut =
            <SpinButton
                hasABetBeenPlaced={hasABetBeenPlaced}
                wheelIsSpinning={wheelIsSpinning}
            />;

        const view = renderer.create(sut)

        expect(view).toMatchSnapshot();
    });
});
