import renderer from 'react-test-renderer';

import { CompletionsCounter } from '../../../components/roulette/CompletionsCounter';

describe('CompletionsCounter', () => {
    it('renders', () => {
        const sut =
            <CompletionsCounter
                playerAddress="foo"
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
