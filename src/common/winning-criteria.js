import { WHEEL_NUMBERS } from "./wheelNumbers";

export const getWinningCriteria = (wheelNumber) => {
    switch (wheelNumber) {
        case WHEEL_NUMBERS.WN_0:
            return ["StraightUp_0"];
        case WHEEL_NUMBERS.WN_00:
            return ["StraightUp_00"];
        case WHEEL_NUMBERS.WN_1:
            return ["StraightUp_1", "1 to 18", "1st 12", "Odd", "Red", "1st Column"];
        case WHEEL_NUMBERS.WN_2:
            return ["StraightUp_2", "1 to 18", "1st 12", "Even", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_3:
            return ["StraightUp_3", "1 to 18", "1st 12", "Odd", "Red", "3rd Column"];
        case WHEEL_NUMBERS.WN_4:
            return ["StraightUp_4", "1 to 18", "1st 12", "Even", "Black", "1st Column"];
        case WHEEL_NUMBERS.WN_5:
            return ["StraightUp_5", "1 to 18", "1st 12", "Odd", "Red", "2nd Column"];
        case WHEEL_NUMBERS.WN_6:
            return ["StraightUp_6", "1 to 18", "1st 12", "Even", "Black", "3rd Column"];
        case WHEEL_NUMBERS.WN_7:
            return ["StraightUp_7", "1 to 18", "1st 12", "Odd", "Red", "1st Column"];
        case WHEEL_NUMBERS.WN_8:
            return ["StraightUp_8", "1 to 18", "1st 12", "Even", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_9:
            return ["StraightUp_9", "1 to 18", "1st 12", "Odd", "Red", "3rd Column"];
        case WHEEL_NUMBERS.WN_10:
            return ["StraightUp_10", "1 to 18", "1st 12", "Even", "Black", "1st Column"];
        case WHEEL_NUMBERS.WN_11:
            return ["StraightUp_11", "1 to 18", "1st 12", "Odd", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_12:
            return ["StraightUp_12", "1 to 18", "1st 12", "Even", "Red", "3rd Column"];
        case WHEEL_NUMBERS.WN_13:
            return ["StraightUp_13", "1 to 18", "2nd 12", "Odd", "Black", "1st Column"];
        case WHEEL_NUMBERS.WN_14:
            return ["StraightUp_14", "1 to 18", "2nd 12", "Even", "Red", "2nd Column"];
        case WHEEL_NUMBERS.WN_15:
            return ["StraightUp_15", "1 to 18", "2nd 12", "Odd", "Black", "3rd Column"];
        case WHEEL_NUMBERS.WN_16:
            return ["StraightUp_16", "1 to 18", "2nd 12", "Even", "Red", "1st Column"];
        case WHEEL_NUMBERS.WN_17:
            return ["StraightUp_17", "1 to 18", "2nd 12", "Odd", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_18:
            return ["StraightUp_18", "1 to 18", "2nd 12", "Even", "Red", "3rd Column"];
        case WHEEL_NUMBERS.WN_19:
            return ["StraightUp_19", "19 to 36", "2nd 12", "Odd", "Red", "1st Column"];
        case WHEEL_NUMBERS.WN_20:
            return ["StraightUp_20", "19 to 36", "2nd 12", "Even", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_21:
            return ["StraightUp_21", "19 to 36", "2nd 12", "Odd", "Red", "3rd Column"];
        case WHEEL_NUMBERS.WN_22:
            return ["StraightUp_22", "19 to 36", "2nd 12", "Even", "Black", "1st Column"];
        case WHEEL_NUMBERS.WN_23:
            return ["StraightUp_23", "19 to 36", "2nd 12", "Odd", "Red", "2nd Column"];
        case WHEEL_NUMBERS.WN_24:
            return ["StraightUp_24", "19 to 36", "2nd 12", "Even", "Black", "3rd Column"];
        case WHEEL_NUMBERS.WN_25:
            return ["StraightUp_25", "19 to 36", "2nd 12", "Odd", "Red", "1st Column"];
        case WHEEL_NUMBERS.WN_26:
            return ["StraightUp_26", "19 to 36", "2nd 12", "Even", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_27:
            return ["StraightUp_27", "19 to 36", "2nd 12", "Odd", "Red", "3rd Column"];
        case WHEEL_NUMBERS.WN_28:
            return ["StraightUp_28", "19 to 36", "2nd 12", "Even", "Black", "1st Column"];
        case WHEEL_NUMBERS.WN_29:
            return ["StraightUp_29", "19 to 36", "2nd 12", "Odd", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_30:
            return ["StraightUp_30", "19 to 36", "2nd 12", "Even", "Red", "3rd Column"];
        case WHEEL_NUMBERS.WN_31:
            return ["StraightUp_31", "19 to 36", "3rd 12", "Odd", "Black", "1st Column"];
        case WHEEL_NUMBERS.WN_32:
            return ["StraightUp_32", "19 to 36", "3rd 12", "Even", "Red", "2nd Column"];
        case WHEEL_NUMBERS.WN_33:
            return ["StraightUp_33", "19 to 36", "3rd 12", "Odd", "Black", "3rd Column"];
        case WHEEL_NUMBERS.WN_34:
            return ["StraightUp_34", "19 to 36", "3rd 12", "Even", "Red", "1st Column"];
        case WHEEL_NUMBERS.WN_35:
            return ["StraightUp_35", "19 to 36", "3rd 12", "Odd", "Black", "2nd Column"];
        case WHEEL_NUMBERS.WN_36:
            return ["StraightUp_36", "19 to 36", "3rd 12", "Even", "Red", "3rd Column"];
        default:
            throw new Error("Invalid wheel number", wheelNumber);
    }
}
