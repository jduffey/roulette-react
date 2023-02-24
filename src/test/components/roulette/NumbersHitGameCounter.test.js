import renderer from 'react-test-renderer';

import {
    NumbersHitGameCounter,
    NumbersHitGameCounterOverlay,
} from "../../../components/roulette/NumberHitGameCounter";

describe("NumbersHitGameCounter", () => {
    it('all boxes inactive when there are no spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: [],
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('1st box only is active when there is 1 spin', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: [['x']],
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('1st box only is active when there are 39 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(39).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('2nd box is active when there are 40 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(40).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('2nd box is active when there are 49 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(49).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('3rd box is active when there are 50 spins', () => {
        const sut = NumbersHitGameCounter({
            transactionHistory: Array(50).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});

describe("NumbersHitGameCounterOverlay", () => {
    it('all boxes inactive when there are no spins', () => {
        const sut = NumbersHitGameCounterOverlay({
            transactionHistory: [],
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('1st box only is active when there is 1 spin', () => {
        const sut = NumbersHitGameCounterOverlay({
            transactionHistory: [['x']],
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('1st box only is active when there are 39 spins', () => {
        const sut = NumbersHitGameCounterOverlay({
            transactionHistory: Array(39).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('2nd box is active when there are 40 spins', () => {
        const sut = NumbersHitGameCounterOverlay({
            transactionHistory: Array(40).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('2nd box is active when there are 49 spins', () => {
        const sut = NumbersHitGameCounterOverlay({
            transactionHistory: Array(49).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });

    it('3rd box is active when there are 50 spins', () => {
        const sut = NumbersHitGameCounterOverlay({
            transactionHistory: Array(50).fill(['x']),
        });

        const view = renderer.create(sut);

        expect(view).toMatchSnapshot();
    });
});
