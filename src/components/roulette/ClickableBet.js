import { BET_NAMES } from "../../common/betNames";
import { STANDARD_COLORS } from "../../common/standardColors";

import { Chip } from "./Chip";

const BETTING_SQUARE_OUTLINE_SIZE = 1;

const CLASS_NAME = "ClickableBet-component";
function ClickableBet(props) {
    return (
        <div
            id={props.id}
            className={CLASS_NAME}
            onClick={() => props.onClick()}
            role="button"
            style={{
                left: props.styleData.left,
                top: props.styleData.top,
                width: props.styleData.width - BETTING_SQUARE_OUTLINE_SIZE,
                height: props.styleData.height - BETTING_SQUARE_OUTLINE_SIZE,
            }}
        >
            <div className="betting-square-contents">
                <div
                    className={`betting-square-label ${props.textLabelClassNamePrefix}-square-label`}
                    style={{
                        backgroundColor: props.styleData.labelBackgroundColor,
                    }}
                >
                    {props.displayText}
                </div>
                <Chip
                    auxiliaryClassName="betting-square-chip"
                    key={props.chipAmount}
                    onClick={props.onClick}
                    chipAmount={props.betAmount}
                />
            </div>
        </div>
    );
}

const DISPLAY_PARAMS = Object.entries({
    // StraightUp 1st Column
    [BET_NAMES.STRAIGHT_UP_1]: [80, 240, 80, 120, STANDARD_COLORS.FELT_RED, "1", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_4]: [160, 240, 80, 120, STANDARD_COLORS.FELT_BLACK, "4", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_7]: [240, 240, 80, 120, STANDARD_COLORS.FELT_RED, "7", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_10]: [320, 240, 80, 120, STANDARD_COLORS.FELT_BLACK, "10", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_13]: [400, 240, 80, 120, STANDARD_COLORS.FELT_BLACK, "13", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_16]: [480, 240, 80, 120, STANDARD_COLORS.FELT_RED, "16", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_19]: [560, 240, 80, 120, STANDARD_COLORS.FELT_RED, "19", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_22]: [640, 240, 80, 120, STANDARD_COLORS.FELT_BLACK, "22", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_25]: [720, 240, 80, 120, STANDARD_COLORS.FELT_RED, "25", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_28]: [800, 240, 80, 120, STANDARD_COLORS.FELT_BLACK, "28", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_31]: [880, 240, 80, 120, STANDARD_COLORS.FELT_BLACK, "31", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_34]: [960, 240, 80, 120, STANDARD_COLORS.FELT_RED, "34", "straightUp1to36"],

    // StraightUp 2nd Column
    [BET_NAMES.STRAIGHT_UP_2]: [80, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "2", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_5]: [160, 120, 80, 120, STANDARD_COLORS.FELT_RED, "5", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_8]: [240, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "8", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_11]: [320, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "11", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_14]: [400, 120, 80, 120, STANDARD_COLORS.FELT_RED, "14", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_17]: [480, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "17", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_20]: [560, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "20", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_23]: [640, 120, 80, 120, STANDARD_COLORS.FELT_RED, "23", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_26]: [720, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "26", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_29]: [800, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "29", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_32]: [880, 120, 80, 120, STANDARD_COLORS.FELT_RED, "32", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_35]: [960, 120, 80, 120, STANDARD_COLORS.FELT_BLACK, "35", "straightUp1to36"],

    // StraightUp 3rd Column
    [BET_NAMES.STRAIGHT_UP_3]: [80, 0, 80, 120, STANDARD_COLORS.FELT_RED, "3", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_6]: [160, 0, 80, 120, STANDARD_COLORS.FELT_BLACK, "6", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_9]: [240, 0, 80, 120, STANDARD_COLORS.FELT_RED, "9", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_12]: [320, 0, 80, 120, STANDARD_COLORS.FELT_RED, "12", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_15]: [400, 0, 80, 120, STANDARD_COLORS.FELT_BLACK, "15", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_18]: [480, 0, 80, 120, STANDARD_COLORS.FELT_RED, "18", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_21]: [560, 0, 80, 120, STANDARD_COLORS.FELT_RED, "21", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_24]: [640, 0, 80, 120, STANDARD_COLORS.FELT_BLACK, "24", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_27]: [720, 0, 80, 120, STANDARD_COLORS.FELT_RED, "27", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_30]: [800, 0, 80, 120, STANDARD_COLORS.FELT_RED, "30", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_33]: [880, 0, 80, 120, STANDARD_COLORS.FELT_BLACK, "33", "straightUp1to36"],
    [BET_NAMES.STRAIGHT_UP_36]: [960, 0, 80, 120, STANDARD_COLORS.FELT_RED, "36", "straightUp1to36"],

    // Zeroes
    [BET_NAMES.STRAIGHT_UP_0]: [0, 180, 80, 180, STANDARD_COLORS.FELT_GREEN, "0", "zero"],
    [BET_NAMES.STRAIGHT_UP_00]: [0, 0, 80, 180, STANDARD_COLORS.FELT_GREEN, "00", "zero"],

    // Dozens
    [BET_NAMES.FIRST_DOZEN]: [80, 360, 320, 80, STANDARD_COLORS.INHERIT, "1st 12", "dozens"],
    [BET_NAMES.SECOND_DOZEN]: [400, 360, 320, 80, STANDARD_COLORS.INHERIT, "2nd 12", "dozens"],
    [BET_NAMES.THIRD_DOZEN]: [720, 360, 320, 80, STANDARD_COLORS.INHERIT, "3rd 12", "dozens"],

    // Columns
    [BET_NAMES.FIRST_COLUMN]: [1040, 240, 80, 120, STANDARD_COLORS.INHERIT, "2 to 1", "column"],
    [BET_NAMES.SECOND_COLUMN]: [1040, 120, 80, 120, STANDARD_COLORS.INHERIT, "2 to 1", "column"],
    [BET_NAMES.THIRD_COLUMN]: [1040, 0, 80, 120, STANDARD_COLORS.INHERIT, "2 to 1", "column"],

    // Halves
    [BET_NAMES.FIRST_18]: [80, 440, 160, 80, STANDARD_COLORS.INHERIT, "1 to 18", "halves"],
    [BET_NAMES.EVEN]: [240, 440, 160, 80, STANDARD_COLORS.INHERIT, "Even", "halves"],
    [BET_NAMES.RED]: [400, 440, 160, 80, STANDARD_COLORS.FELT_RED, "Red", "halves-colors"],
    [BET_NAMES.BLACK]: [560, 440, 160, 80, STANDARD_COLORS.FELT_BLACK, "Black", "halves-colors"],
    [BET_NAMES.ODD]: [720, 440, 160, 80, STANDARD_COLORS.INHERIT, "Odd", "halves"],
    [BET_NAMES.SECOND_18]: [880, 440, 160, 80, STANDARD_COLORS.INHERIT, "19 to 36", "halves"],
}).reduce((acc, [betName, params]) => {
    acc[betName] = {
        styleData: {
            left: params[0],
            top: params[1],
            width: params[2],
            height: params[3],
            labelBackgroundColor: params[4],
        },
        displayText: params[5],
        textLabelClassNamePrefix: params[6],
    };
    return acc;
}, {});

export {
    ClickableBet,
    DISPLAY_PARAMS,
};
