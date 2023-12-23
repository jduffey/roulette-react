import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { App } from "../../components/App";

describe("App", () => {
    it.each([
        ["/"],
        ["/chuck-a-luck"],
        ["/three-card-poker"],
        ["/roulette"],
        ["/sic-bo"],
        ["/blackjack"],
        ["/baccarat"],
        ["/keno"],
        ["/space-poker"],
        ["/diamond-miner"],
        ["/gift-tree"],
        ["/coin-flip"],
        ["/balances"],
    ])("renders route \"%s\"", (path) => {
        const view = renderer.create(
            <MemoryRouter initialEntries={[path]} >
                <App />
            </MemoryRouter>,
        );

        expect(view).toMatchSnapshot();
    });
});
