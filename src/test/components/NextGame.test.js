import renderer from "react-test-renderer";

import { NextGame } from "../../components/NextGame";

import { MemoryRouter } from "react-router-dom";

describe("NextGame", () => {
    it("renders", () => {
        const actual = renderer.create(
            <MemoryRouter >
                <NextGame />
            </MemoryRouter>,
        );

        expect(actual).toMatchSnapshot();
    });
});
