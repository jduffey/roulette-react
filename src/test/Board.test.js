import renderer from 'react-test-renderer';

import { Board } from '../components/Board';

import { BET_NAMES } from '../common/betNames';

// TODO make tests with bets placed
describe('Board', () => {
    it('renders with no bets placed', () => {
        const betsOnBoard = {};

        const sut =
            <Board
                betsOnBoard={betsOnBoard}
            />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });

    it('renders with bets placed on all bet names', () => {
        const betsOnBoard = {
            [BET_NAMES.STRAIGHT_UP_0]: 1,
            [BET_NAMES.STRAIGHT_UP_00]: 1,
            [BET_NAMES.STRAIGHT_UP_1]: 1,
            [BET_NAMES.STRAIGHT_UP_2]: 1,
            [BET_NAMES.STRAIGHT_UP_3]: 1,
            [BET_NAMES.STRAIGHT_UP_4]: 1,
            [BET_NAMES.STRAIGHT_UP_5]: 1,
            [BET_NAMES.STRAIGHT_UP_6]: 1,
            [BET_NAMES.STRAIGHT_UP_7]: 1,
            [BET_NAMES.STRAIGHT_UP_8]: 1,
            [BET_NAMES.STRAIGHT_UP_9]: 1,
            [BET_NAMES.STRAIGHT_UP_10]: 1,
            [BET_NAMES.STRAIGHT_UP_11]: 1,
            [BET_NAMES.STRAIGHT_UP_12]: 1,
            [BET_NAMES.STRAIGHT_UP_13]: 1,
            [BET_NAMES.STRAIGHT_UP_14]: 1,
            [BET_NAMES.STRAIGHT_UP_15]: 1,
            [BET_NAMES.STRAIGHT_UP_16]: 1,
            [BET_NAMES.STRAIGHT_UP_17]: 1,
            [BET_NAMES.STRAIGHT_UP_18]: 1,
            [BET_NAMES.STRAIGHT_UP_19]: 1,
            [BET_NAMES.STRAIGHT_UP_20]: 1,
            [BET_NAMES.STRAIGHT_UP_21]: 1,
            [BET_NAMES.STRAIGHT_UP_22]: 1,
            [BET_NAMES.STRAIGHT_UP_23]: 1,
            [BET_NAMES.STRAIGHT_UP_24]: 1,
            [BET_NAMES.STRAIGHT_UP_25]: 1,
            [BET_NAMES.STRAIGHT_UP_26]: 1,
            [BET_NAMES.STRAIGHT_UP_27]: 1,
            [BET_NAMES.STRAIGHT_UP_28]: 1,
            [BET_NAMES.STRAIGHT_UP_29]: 1,
            [BET_NAMES.STRAIGHT_UP_30]: 1,
            [BET_NAMES.STRAIGHT_UP_31]: 1,
            [BET_NAMES.STRAIGHT_UP_32]: 1,
            [BET_NAMES.STRAIGHT_UP_33]: 1,
            [BET_NAMES.STRAIGHT_UP_34]: 1,
            [BET_NAMES.STRAIGHT_UP_35]: 1,
            [BET_NAMES.STRAIGHT_UP_36]: 1,
            [BET_NAMES.FIRST_COLUMN]: 1,
            [BET_NAMES.SECOND_COLUMN]: 1,
            [BET_NAMES.THIRD_COLUMN]: 1,
            [BET_NAMES.FIRST_DOZEN]: 1,
            [BET_NAMES.SECOND_DOZEN]: 1,
            [BET_NAMES.THIRD_DOZEN]: 1,
            [BET_NAMES.FIRST_18]: 1,
            [BET_NAMES.EVEN]: 1,
            [BET_NAMES.ODD]: 1,
            [BET_NAMES.RED]: 1,
            [BET_NAMES.BLACK]: 1,
            [BET_NAMES.SECOND_18]: 1,
        };

        const sut =
            <Board
                betsOnBoard={betsOnBoard}
            />;

        const actual = renderer.create(sut);

        expect(actual).toMatchSnapshot();
    });
});
