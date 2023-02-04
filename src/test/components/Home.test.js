import renderer from "react-test-renderer";

import { Home } from "../../components/Home";

describe("Home", () => {
    it("renders", () => {
        const actual = renderer.create(<Home />);

        expect(actual).toMatchSnapshot();
    });
});
