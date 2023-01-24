import { STANDARD_COLORS } from "./standardColors";
import { WHEEL_NUMBERS } from "./wheelNumbers";

export const getWheelNumberColor = (wheelNumber) => {
    switch (wheelNumber) {
        case WHEEL_NUMBERS.WN_1:
        case WHEEL_NUMBERS.WN_3:
        case WHEEL_NUMBERS.WN_5:
        case WHEEL_NUMBERS.WN_7:
        case WHEEL_NUMBERS.WN_9:
        case WHEEL_NUMBERS.WN_12:
        case WHEEL_NUMBERS.WN_14:
        case WHEEL_NUMBERS.WN_16:
        case WHEEL_NUMBERS.WN_18:
        case WHEEL_NUMBERS.WN_19:
        case WHEEL_NUMBERS.WN_21:
        case WHEEL_NUMBERS.WN_23:
        case WHEEL_NUMBERS.WN_25:
        case WHEEL_NUMBERS.WN_27:
        case WHEEL_NUMBERS.WN_30:
        case WHEEL_NUMBERS.WN_32:
        case WHEEL_NUMBERS.WN_34:
        case WHEEL_NUMBERS.WN_36:
            return STANDARD_COLORS.FELT_RED;

        case WHEEL_NUMBERS.WN_2:
        case WHEEL_NUMBERS.WN_4:
        case WHEEL_NUMBERS.WN_6:
        case WHEEL_NUMBERS.WN_8:
        case WHEEL_NUMBERS.WN_10:
        case WHEEL_NUMBERS.WN_11:
        case WHEEL_NUMBERS.WN_13:
        case WHEEL_NUMBERS.WN_15:
        case WHEEL_NUMBERS.WN_17:
        case WHEEL_NUMBERS.WN_20:
        case WHEEL_NUMBERS.WN_22:
        case WHEEL_NUMBERS.WN_24:
        case WHEEL_NUMBERS.WN_26:
        case WHEEL_NUMBERS.WN_28:
        case WHEEL_NUMBERS.WN_29:
        case WHEEL_NUMBERS.WN_31:
        case WHEEL_NUMBERS.WN_33:
        case WHEEL_NUMBERS.WN_35:
            return STANDARD_COLORS.FELT_BLACK;

        case WHEEL_NUMBERS.WN_0:
        case WHEEL_NUMBERS.WN_00:
            return STANDARD_COLORS.FELT_GREEN;

        default:
            throw new Error(`Unknown wheel number: ${wheelNumber}`);
    }
}
