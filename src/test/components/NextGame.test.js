import renderer from "react-test-renderer";

import { NextGame } from "../../components/NextGame";

describe("NextGame", () => {
    it("renders", () => {
        const view = renderer.create(<NextGame />);

        expect(view).toMatchSnapshot();
    });
});
