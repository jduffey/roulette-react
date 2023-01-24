import renderer from 'react-test-renderer';

import { BetOption } from '../../components/BetOption';

describe('BetOption', () => {
    it('renders when chip is visible', () => {
        const props = {
            betName: "BET_NAME",
            onClick: () => { },
            styleData: {
                left: 10,
                top: 20,
                width: 30,
                height: 40,
                backgroundColor: "BACKGROUND_COLOR",
                labelBackgroundColor: "LABEL_BACKGROUND_COLOR",
            },
            classNamePrefix: "CLASSNAME_PREFIX",
            displayText: "DISPLAY_TEXT",
            betAmount: 1,
        };

        const sut = BetOption(props);

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders when chip is not visible', () => {
        const props = {
            betName: "BET_NAME",
            onClick: () => { },
            styleData: {
                left: 10,
                top: 20,
                width: 30,
                height: 40,
                backgroundColor: "BACKGROUND_COLOR",
                labelBackgroundColor: "LABEL_BACKGROUND_COLOR",
            },
            classNamePrefix: "CLASSNAME_PREFIX",
            displayText: "DISPLAY_TEXT",
            betAmount: 0,
        };

        const sut = BetOption(props);

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
