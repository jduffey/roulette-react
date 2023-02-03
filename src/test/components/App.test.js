import renderer from "react-test-renderer";

import { App } from "../../components/App";

import { MemoryRouter } from "react-router-dom";

describe("App", () => {
    it("renders", () => {
        const actual = renderer.create(
            <MemoryRouter >
                <App />
            </MemoryRouter>,
        );

        expect(actual).toMatchSnapshot();
    });
});
