import renderer from "react-test-renderer";

import { App } from "../../components/App";

describe("App", () => {
    it("renders", () => {
        const sut = App();

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
