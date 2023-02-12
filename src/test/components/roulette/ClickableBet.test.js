import renderer from 'react-test-renderer';

import { ClickableBet } from '../../../components/roulette/ClickableBet';

describe('ClickableBet', () => {
    describe('renders when', () => {
        it.each([
            ["chip is visible", 1],
            ["chip is not visible", 0],
        ])('renders when %s', (_description, betAmount) => {
            const props = {
                betName: "BET_NAME",
                onClick: () => "ON_CLICK",
                styleData: {
                    left: 10,
                    top: 20,
                    width: 30,
                    height: 40,
                    backgroundColor: "BACKGROUND_COLOR",
                    labelBackgroundColor: "LABEL_BACKGROUND_COLOR",
                },
                textLabelClassNamePrefix: "TEXT_LABEL_CLASSNAME_PREFIX",
                displayText: "DISPLAY_TEXT",
                betAmount,
            };

            const sut = ClickableBet(props);

            const actual = renderer.create(sut);

            expect(actual).toMatchSnapshot();
        });
    });
});
