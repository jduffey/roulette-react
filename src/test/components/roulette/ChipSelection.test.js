import renderer from 'react-test-renderer';

import { ChipSelection } from '../../../components/roulette/ChipSelection';

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
                currentChipAmountSelected,
                onClick: () => "ON_CLICK",
            });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
