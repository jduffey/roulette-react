import renderer from "react-test-renderer";

import { Home } from "../../components/Home";

describe("Home", () => {
    it("renders", () => {
        const view = renderer.create(<Home />);

        expect(view).toMatchSnapshot();
    });
});
