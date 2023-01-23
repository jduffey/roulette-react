import renderer from 'react-test-renderer';

import { ChipSelection } from '../../components/ChipSelection';

describe('ChipSelection', () => {
    it.each([
        [1],
        [5],
        [25],
        [100],
        [500],
        [1000],
    ])('renders when currentChipAmountSelected is %s', (currentChipAmountSelected) => {
        const sut =
            ChipSelection({
                currentChipAmountSelected: currentChipAmountSelected,
                onClick: () => { },
            });

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
