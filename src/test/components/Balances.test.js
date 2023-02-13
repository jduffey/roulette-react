import renderer from "react-test-renderer";

import { Balances } from "../../components/Balances";

describe("Balances", () => {
    it("renders", () => {
        const view = renderer.create(<Balances />);

        expect(view).toMatchSnapshot();
    });
});
