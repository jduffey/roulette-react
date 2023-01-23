import renderer from 'react-test-renderer';

import { Chip } from '../../components/Chip';

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
        const className = "CLASSNAME";
        const onClickFunction = () => { };

        describe('when isSelected is false', () => {
            it.each(boundaryValues)('chip amount %s', (chipAmount) => {
                const isSelected = false;

                const sut =
                    Chip({
                        id: id,
                        key: key,
                        className: className,
                        chipAmount: chipAmount,
                        onClick: onClickFunction,
                        isSelected: isSelected,
                    });

                const actual = renderer.create(sut);

                expect(actual).toMatchSnapshot();
            });
        });

        describe('when isSelected is true', () => {
            it.each(boundaryValues)('chip amount %s', (chipAmount) => {
                const isSelected = true;

                const sut =
                    Chip({
                        id: id,
                        key: key,
                        className: className,
                        chipAmount: chipAmount,
                        onClick: onClickFunction,
                        isSelected: isSelected,
                    });

                const actual = renderer.create(sut);

                expect(actual).toMatchSnapshot();
            });
        });
    });
});
