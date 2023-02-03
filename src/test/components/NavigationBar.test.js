import renderer from "react-test-renderer";

import { NavigationBar } from "../../components/NavigationBar";

describe("NavigationBar", () => {
    it("renders", () => {
        const sut = NavigationBar();

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
