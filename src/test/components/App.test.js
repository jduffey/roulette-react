import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { App } from "../../components/App";

describe("App", () => {
    it.each([
        ["/"],
        ["/roulette-p1"],
        ["/roulette-p2"],
        ["/roulette-p3"],
        ["/sic-bo"],
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
