import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import { App } from "../../components/App";


describe("App", () => {
    it.each([
        ["/"],
        ["/roulette"],
        ["/next-game"],
    ])("renders route \"%s\"", (path) => {
        const actual = renderer.create(
            <MemoryRouter initialEntries={[path]} >
                <App />
            </MemoryRouter>,
        );

        expect(actual).toMatchSnapshot();
    });
});
