import renderer from 'react-test-renderer';

import { RewardsInfo } from '../../components/RewardsInfo';

describe('RewardsInfo', () => {
    it("renders when transaction history is empty", () => {
        const sut =
            <RewardsInfo
                transactionHistory={[]}
            />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it("renders when there are multiple transactions", () => {
        const sut =
            <RewardsInfo
                transactionHistory={[
                    {
                        betsPlaced: {
                            "foo": 100,
                            "bar": 200,
                            "baz": 300,
                        },
                    },
                    {
                        betsPlaced: {
                            "foo": 400,
                            "bar": 500,
                            "baz": 600,
                        },
                    },
                ]}
            />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
