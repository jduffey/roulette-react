import renderer from 'react-test-renderer';

import { SpinResult } from '../../../components/roulette/SpinResult';

import { WHEEL_NUMBERS } from '../../../common/wheelNumbers';

describe('SpinResult', () => {
    it.each([
        [undefined],
        [null],
    ])('renders when spin result is not defined (%s)', (spinResult) => {
        const sut =
            <SpinResult
                spinResult={spinResult}
            />;

        const tree = renderer.create(sut);

        expect(tree).toMatchSnapshot();
    });

    it.each(
        Object.values(WHEEL_NUMBERS).map((wheelNumber) => wheelNumber)
    )('renders when spin result is %s', (spinResult) => {
        const convertedSpinResult = spinResult === "00"
            ? 37
            : parseInt(spinResult, 10);
        const sut =
            <SpinResult
                spinResult={convertedSpinResult}
            />;

        const tree = renderer.create(sut);

        expect(tree).toMatchSnapshot();
    });
});
