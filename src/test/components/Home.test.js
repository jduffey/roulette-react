import renderer from "react-test-renderer";

import { Home } from "../../components/Home";

import { MemoryRouter } from "react-router-dom";

describe("Home", () => {
    it("renders", () => {
        const actual = renderer.create(
            <MemoryRouter >
                <Home />
            </MemoryRouter>,
        );

        expect(actual).toMatchSnapshot();
    });
});
