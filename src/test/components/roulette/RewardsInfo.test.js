import renderer from 'react-test-renderer';

import { RewardsInfo } from '../../../components/roulette/RewardsInfo';

describe('RewardsInfo', () => {
    it("renders when transaction history is empty", () => {
        const sut =
            <RewardsInfo
                transactionHistory={[]}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
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

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders when there are won and lost games', () => {
        const sut =
            <RewardsInfo
                transactionHistory={[
                    { // win
                        startingBalance: 1,
                        finalBalance: 2,
                    },
                    { // win
                        startingBalance: 1,
                        finalBalance: 2,
                    },
                    { // win
                        startingBalance: 1,
                        finalBalance: 2,
                    },
                    { // lose
                        startingBalance: 2,
                        finalBalance: 1,
                    },
                    { // lose
                        startingBalance: 2,
                        finalBalance: 1,
                    },
                    { // "tie"
                        startingBalance: 2,
                        finalBalance: 2,
                    },
                ]}
            />;

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
