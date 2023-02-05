import { BET_NAMES } from "./sicBoBetNames";
import { STANDARD_COLORS } from "../../common/standardColors";

export const BET_OPTION_PARAMS = Object.entries({
    [BET_NAMES.SMALL]: [0, 60, 200, 160, STANDARD_COLORS.INHERIT, "Small!"],
    [BET_NAMES.BIG]: [1200, 60, 200, 160, STANDARD_COLORS.INHERIT, "Big!"],
    [BET_NAMES.DOUBLE_ONE]: [210, 100, 60, 120, STANDARD_COLORS.INHERIT, "1 1"],
    [BET_NAMES.DOUBLE_TWO]: [280, 100, 60, 120, STANDARD_COLORS.INHERIT, "2 2"],
    [BET_NAMES.DOUBLE_THREE]: [350, 100, 60, 120, STANDARD_COLORS.INHERIT, "3 3"],
    [BET_NAMES.DOUBLE_FOUR]: [990, 100, 60, 120, STANDARD_COLORS.INHERIT, "4 4"],
    [BET_NAMES.DOUBLE_FIVE]: [1060, 100, 60, 120, STANDARD_COLORS.INHERIT, "5 5"],
    [BET_NAMES.DOUBLE_SIX]: [1130, 100, 60, 120, STANDARD_COLORS.INHERIT, "6 6"],
    [BET_NAMES.TRIPLE_ONE]: [420, 100, 120, 40, STANDARD_COLORS.INHERIT, "1 1 1"],
    [BET_NAMES.TRIPLE_TWO]: [420, 140, 120, 40, STANDARD_COLORS.INHERIT, "2 2 2"],
    [BET_NAMES.TRIPLE_THREE]: [420, 180, 120, 40, STANDARD_COLORS.INHERIT, "3 3 3"],
    [BET_NAMES.TRIPLE_FOUR]: [860, 100, 120, 40, STANDARD_COLORS.INHERIT, "4 4 4"],
    [BET_NAMES.TRIPLE_FIVE]: [860, 140, 120, 40, STANDARD_COLORS.INHERIT, "5 5 5"],
    [BET_NAMES.TRIPLE_SIX]: [860, 180, 120, 40, STANDARD_COLORS.INHERIT, "6 6 6"],
    [BET_NAMES.ANY_TRIPLE]: [550, 100, 300, 120, STANDARD_COLORS.INHERIT, "Any Triple"],
}).reduce((acc, [betOptionName, params]) => {
    acc[betOptionName] = {
        styleData: {
            left: params[0],
            top: params[1],
            width: params[2],
            height: params[3],
            backgroundColor: params[4],
            // labelBackgroundColor: params[5],
        },
        displayText: params[5],
    };
    return acc;
}, {});
