import { BET_NAMES } from "./betNames";
import { WHEEL_NUMBERS } from "./wheelNumbers";

export const getWinningCriteria = (wheelNumber) => {
    switch (wheelNumber) {
        case WHEEL_NUMBERS.WN_0:
            return new Set([BET_NAMES.STRAIGHT_UP_0]);
        case WHEEL_NUMBERS.WN_00:
            return new Set([BET_NAMES.STRAIGHT_UP_00]);
        case WHEEL_NUMBERS.WN_1:
            return new Set([BET_NAMES.STRAIGHT_UP_1, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_2:
            return new Set([BET_NAMES.STRAIGHT_UP_2, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_3:
            return new Set([BET_NAMES.STRAIGHT_UP_3, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_4:
            return new Set([BET_NAMES.STRAIGHT_UP_4, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_5:
            return new Set([BET_NAMES.STRAIGHT_UP_5, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_6:
            return new Set([BET_NAMES.STRAIGHT_UP_6, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_7:
            return new Set([BET_NAMES.STRAIGHT_UP_7, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_8:
            return new Set([BET_NAMES.STRAIGHT_UP_8, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_9:
            return new Set([BET_NAMES.STRAIGHT_UP_9, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_10:
            return new Set([BET_NAMES.STRAIGHT_UP_10, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_11:
            return new Set([BET_NAMES.STRAIGHT_UP_11, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_12:
            return new Set([BET_NAMES.STRAIGHT_UP_12, BET_NAMES.FIRST_18, BET_NAMES.FIRST_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_13:
            return new Set([BET_NAMES.STRAIGHT_UP_13, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_14:
            return new Set([BET_NAMES.STRAIGHT_UP_14, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_15:
            return new Set([BET_NAMES.STRAIGHT_UP_15, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_16:
            return new Set([BET_NAMES.STRAIGHT_UP_16, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_17:
            return new Set([BET_NAMES.STRAIGHT_UP_17, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_18:
            return new Set([BET_NAMES.STRAIGHT_UP_18, BET_NAMES.FIRST_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_19:
            return new Set([BET_NAMES.STRAIGHT_UP_19, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_20:
            return new Set([BET_NAMES.STRAIGHT_UP_20, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_21:
            return new Set([BET_NAMES.STRAIGHT_UP_21, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_22:
            return new Set([BET_NAMES.STRAIGHT_UP_22, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_23:
            return new Set([BET_NAMES.STRAIGHT_UP_23, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_24:
            return new Set([BET_NAMES.STRAIGHT_UP_24, BET_NAMES.SECOND_18, BET_NAMES.SECOND_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_25:
            return new Set([BET_NAMES.STRAIGHT_UP_25, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_26:
            return new Set([BET_NAMES.STRAIGHT_UP_26, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_27:
            return new Set([BET_NAMES.STRAIGHT_UP_27, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_28:
            return new Set([BET_NAMES.STRAIGHT_UP_28, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_29:
            return new Set([BET_NAMES.STRAIGHT_UP_29, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_30:
            return new Set([BET_NAMES.STRAIGHT_UP_30, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_31:
            return new Set([BET_NAMES.STRAIGHT_UP_31, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_32:
            return new Set([BET_NAMES.STRAIGHT_UP_32, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_33:
            return new Set([BET_NAMES.STRAIGHT_UP_33, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.THIRD_COLUMN]);
        case WHEEL_NUMBERS.WN_34:
            return new Set([BET_NAMES.STRAIGHT_UP_34, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.FIRST_COLUMN]);
        case WHEEL_NUMBERS.WN_35:
            return new Set([BET_NAMES.STRAIGHT_UP_35, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.ODD, BET_NAMES.BLACK, BET_NAMES.SECOND_COLUMN]);
        case WHEEL_NUMBERS.WN_36:
            return new Set([BET_NAMES.STRAIGHT_UP_36, BET_NAMES.SECOND_18, BET_NAMES.THIRD_DOZEN, BET_NAMES.EVEN, BET_NAMES.RED, BET_NAMES.THIRD_COLUMN]);
        case 37: // "00" emitted by the Solidity contract
            return new Set([BET_NAMES.STRAIGHT_UP_00]);
        default:
            throw new Error("Invalid wheel number", wheelNumber);
    }
}
