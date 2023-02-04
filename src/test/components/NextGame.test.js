import renderer from "react-test-renderer";

import { NextGame } from "../../components/NextGame";

describe("NextGame", () => {
    it("renders", () => {
        const actual = renderer.create(<NextGame />);

        expect(actual).toMatchSnapshot();
    });
});
