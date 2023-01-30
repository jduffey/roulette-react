import { BET_NAMES } from "./betNames";

export const getBetNameMultiplier = (betName) => {
    console.log("getBetNameMultiplier should be called once per bet placed", betName);
    switch (betName) {
        case BET_NAMES.STRAIGHT_UP_0:
        case BET_NAMES.STRAIGHT_UP_00:
        case BET_NAMES.STRAIGHT_UP_1:
        case BET_NAMES.STRAIGHT_UP_2:
        case BET_NAMES.STRAIGHT_UP_3:
        case BET_NAMES.STRAIGHT_UP_4:
        case BET_NAMES.STRAIGHT_UP_5:
        case BET_NAMES.STRAIGHT_UP_6:
        case BET_NAMES.STRAIGHT_UP_7:
        case BET_NAMES.STRAIGHT_UP_8:
        case BET_NAMES.STRAIGHT_UP_9:
        case BET_NAMES.STRAIGHT_UP_10:
        case BET_NAMES.STRAIGHT_UP_11:
        case BET_NAMES.STRAIGHT_UP_12:
        case BET_NAMES.STRAIGHT_UP_13:
        case BET_NAMES.STRAIGHT_UP_14:
        case BET_NAMES.STRAIGHT_UP_15:
        case BET_NAMES.STRAIGHT_UP_16:
        case BET_NAMES.STRAIGHT_UP_17:
        case BET_NAMES.STRAIGHT_UP_18:
        case BET_NAMES.STRAIGHT_UP_19:
        case BET_NAMES.STRAIGHT_UP_20:
        case BET_NAMES.STRAIGHT_UP_21:
        case BET_NAMES.STRAIGHT_UP_22:
        case BET_NAMES.STRAIGHT_UP_23:
        case BET_NAMES.STRAIGHT_UP_24:
        case BET_NAMES.STRAIGHT_UP_25:
        case BET_NAMES.STRAIGHT_UP_26:
        case BET_NAMES.STRAIGHT_UP_27:
        case BET_NAMES.STRAIGHT_UP_28:
        case BET_NAMES.STRAIGHT_UP_29:
        case BET_NAMES.STRAIGHT_UP_30:
        case BET_NAMES.STRAIGHT_UP_31:
        case BET_NAMES.STRAIGHT_UP_32:
        case BET_NAMES.STRAIGHT_UP_33:
        case BET_NAMES.STRAIGHT_UP_34:
        case BET_NAMES.STRAIGHT_UP_35:
        case BET_NAMES.STRAIGHT_UP_36:
            return 35;

        case BET_NAMES.FIRST_DOZEN:
        case BET_NAMES.SECOND_DOZEN:
        case BET_NAMES.THIRD_DOZEN:
        case BET_NAMES.FIRST_COLUMN:
        case BET_NAMES.SECOND_COLUMN:
        case BET_NAMES.THIRD_COLUMN:
            return 2;

        case BET_NAMES.FIRST_18:
        case BET_NAMES.SECOND_18:
        case BET_NAMES.EVEN:
        case BET_NAMES.ODD:
        case BET_NAMES.RED:
        case BET_NAMES.BLACK:
            return 1;

        default:
            throw new Error("Invalid bet name", betName);
    }
}
