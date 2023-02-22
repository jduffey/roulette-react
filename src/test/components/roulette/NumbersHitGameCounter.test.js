import renderer from 'react-test-renderer';

import { NumbersHitGameCounter } from "../../../components/roulette/NumberHitGameCounter";
import { NumbersHitGameCounterOverlay } from "../../../components/roulette/NumberHitGameCounter";

describe("NumbersHitGameCounter", () => {
    it('renders when there are no spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: [],
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders when there is 1 spin', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: [['x']],
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders when there are 39 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(39).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders when there are 40 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(40).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders when there are 49 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(49).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('renders when there are 50 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(50).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});

// describe("NumbersHitGameCounterOverlay", () => {
//     it("renders", () => {
//         const wrapper = shallow(<NumbersHitGameCounterOverlay transactionHistory={[]} />);
//         expect(wrapper.exists()).toBe(true);
//     });
// });
