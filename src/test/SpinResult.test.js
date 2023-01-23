import renderer from 'react-test-renderer';

import { SpinResult } from '../components/SpinResult';

import { WHEEL_NUMBERS } from '../common/wheelNumbers';

describe('SpinResult', () => {
    // TODO write tests for each wheel number
    // TODO replace color with referenced standard colors
    it.each([
        [WHEEL_NUMBERS.WN_0, 'green'],
        [WHEEL_NUMBERS.WN_1, 'red'],
        [WHEEL_NUMBERS.WN_2, 'black'],
        [undefined, 'undefined'],
    ])('renders %s as %s', (spinResult, _color) => {
        const sut =
            <SpinResult
                spinResult={spinResult}
            />;

        const tree = renderer.create(sut);

        expect(tree).toMatchSnapshot();
    });
});
