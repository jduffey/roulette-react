import renderer from 'react-test-renderer';

import { Chip } from '../../../components/roulette/Chip';

describe('Chip', () => {
    describe('boundary tests for chip colors', () => {
        const boundaryValues = [
            [0],
            [1],
            [4],
            [5],
            [24],
            [25],
            [99],
            [100],
            [499],
            [500],
            [999],
            [1000],
        ];
        const id = "ID";
        const key = "KEY";
        const auxiliaryClassName = "AUXILIARY_CLASSNAME";
        const onClickFunction = () => "ON_CLICK";

        describe('when isSelected is false', () => {
            it.each(boundaryValues)('chip amount %s', (chipAmount) => {
                const isSelected = false;

                const sut =
                    Chip({
                        id,
                        key,
                        auxiliaryClassName,
                        chipAmount,
                        onClick: onClickFunction,
                        isSelected,
                    });

                const view = renderer.create(sut);

                expect(view).toMatchSnapshot();
            });
        });

        describe('when isSelected is true', () => {
            it.each(boundaryValues)('chip amount %s', (chipAmount) => {
                const isSelected = true;

                const sut =
                    Chip({
                        id,
                        key,
                        auxiliaryClassName,
                        chipAmount,
                        onClick: onClickFunction,
                        isSelected,
                    });

                const view = renderer.create(sut);

                expect(view).toMatchSnapshot();
            });
        });
    });
});
