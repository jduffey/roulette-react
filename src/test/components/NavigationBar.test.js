import renderer from "react-test-renderer";

import { NavigationBar } from "../../components/NavigationBar";

import { MemoryRouter } from "react-router-dom";

describe("NavigationBar", () => {
    it("renders", () => {
        const view = renderer.create(
            <MemoryRouter >
                <NavigationBar />
            </MemoryRouter>,
        );

        expect(view).toMatchSnapshot();
    });
});
