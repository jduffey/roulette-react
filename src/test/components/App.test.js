import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { App } from "../../components/App";

describe("App", () => {
    it.each([
        ["/"],
        ["/roulette"],
        ["/next-game"],
        ["/sic-bo"],
    ])("renders route \"%s\"", (path) => {
        const view = renderer.create(
            <MemoryRouter initialEntries={[path]} >
                <App />
            </MemoryRouter>,
        );

        expect(view).toMatchSnapshot();
    });
});
