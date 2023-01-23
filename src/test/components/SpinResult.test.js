import renderer from 'react-test-renderer';

import { SpinResult } from '../../components/SpinResult';

import { WHEEL_NUMBERS } from '../../common/wheelNumbers';

// TODO need tests to verify that the color of the spin result is correct..?

describe('SpinResult', () => {
    it.each([
        [WHEEL_NUMBERS.WN_0],
        [WHEEL_NUMBERS.WN_00],
        [WHEEL_NUMBERS.WN_1],
        [WHEEL_NUMBERS.WN_2],
        [WHEEL_NUMBERS.WN_3],
        [WHEEL_NUMBERS.WN_4],
        [WHEEL_NUMBERS.WN_5],
        [WHEEL_NUMBERS.WN_6],
        [WHEEL_NUMBERS.WN_7],
        [WHEEL_NUMBERS.WN_8],
        [WHEEL_NUMBERS.WN_9],
        [WHEEL_NUMBERS.WN_10],
        [WHEEL_NUMBERS.WN_11],
        [WHEEL_NUMBERS.WN_12],
        [WHEEL_NUMBERS.WN_13],
        [WHEEL_NUMBERS.WN_14],
        [WHEEL_NUMBERS.WN_15],
        [WHEEL_NUMBERS.WN_16],
        [WHEEL_NUMBERS.WN_17],
        [WHEEL_NUMBERS.WN_18],
        [WHEEL_NUMBERS.WN_19],
        [WHEEL_NUMBERS.WN_20],
        [WHEEL_NUMBERS.WN_21],
        [WHEEL_NUMBERS.WN_22],
        [WHEEL_NUMBERS.WN_23],
        [WHEEL_NUMBERS.WN_24],
        [WHEEL_NUMBERS.WN_25],
        [WHEEL_NUMBERS.WN_26],
        [WHEEL_NUMBERS.WN_27],
        [WHEEL_NUMBERS.WN_28],
        [WHEEL_NUMBERS.WN_29],
        [WHEEL_NUMBERS.WN_30],
        [WHEEL_NUMBERS.WN_31],
        [WHEEL_NUMBERS.WN_32],
        [WHEEL_NUMBERS.WN_33],
        [WHEEL_NUMBERS.WN_34],
        [WHEEL_NUMBERS.WN_35],
        [WHEEL_NUMBERS.WN_36],
        [undefined, 'undefined'],
    ])('renders %s', (spinResult) => {
        const sut =
            <SpinResult
                spinResult={spinResult}
            />;

        const tree = renderer.create(sut);

        expect(tree).toMatchSnapshot();
    });
});
