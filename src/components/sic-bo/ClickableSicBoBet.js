import { BET_NAMES } from "./sicBoBetNames";
import { STANDARD_COLORS } from "../../common/standardColors";

const BETTING_SQUARE_OUTLINE_SIZE = 1;

const CLASS_NAME = "ClickableSicBoBet-component";
function ClickableSicBoBet(props) {
    return (
        <div
            className={CLASS_NAME}
            onClick={props.onClick}
            style={{
                left: props.styleData.left,
                top: props.styleData.top,
                width: props.styleData.width - BETTING_SQUARE_OUTLINE_SIZE,
                height: props.styleData.height - BETTING_SQUARE_OUTLINE_SIZE,
                backgroundColor: props.styleData.backgroundColor,
            }}
        >
            <div className="betting-square-contents">
                <div
                    className={`betting-square-label`}
                    style={{
                        backgroundColor: props.styleData.labelBackgroundColor,
                    }}
                >
                    {props.displayText}
                </div>
            </div>
        </div>
    );
}

const BET_OPTION_DISPLAY_PARAMS = Object.entries({
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
    [BET_NAMES.SUM_4]: [0, 220, 100, 160, STANDARD_COLORS.INHERIT, "4"],
    [BET_NAMES.SUM_5]: [100, 220, 100, 160, STANDARD_COLORS.INHERIT, "5"],
    [BET_NAMES.SUM_6]: [200, 220, 100, 160, STANDARD_COLORS.INHERIT, "6"],
    [BET_NAMES.SUM_7]: [300, 220, 100, 160, STANDARD_COLORS.INHERIT, "7"],
    [BET_NAMES.SUM_8]: [400, 220, 100, 160, STANDARD_COLORS.INHERIT, "8"],
    [BET_NAMES.SUM_9]: [500, 220, 100, 160, STANDARD_COLORS.INHERIT, "9"],
    [BET_NAMES.SUM_10]: [600, 220, 100, 160, STANDARD_COLORS.INHERIT, "10"],
    [BET_NAMES.SUM_11]: [700, 220, 100, 160, STANDARD_COLORS.INHERIT, "11"],
    [BET_NAMES.SUM_12]: [800, 220, 100, 160, STANDARD_COLORS.INHERIT, "12"],
    [BET_NAMES.SUM_13]: [900, 220, 100, 160, STANDARD_COLORS.INHERIT, "13"],
    [BET_NAMES.SUM_14]: [1000, 220, 100, 160, STANDARD_COLORS.INHERIT, "14"],
    [BET_NAMES.SUM_15]: [1100, 220, 100, 160, STANDARD_COLORS.INHERIT, "15"],
    [BET_NAMES.SUM_16]: [1200, 220, 100, 160, STANDARD_COLORS.INHERIT, "16"],
    [BET_NAMES.SUM_17]: [1300, 220, 100, 160, STANDARD_COLORS.INHERIT, "17"],
    [BET_NAMES.PAIR1_2]: [200, 380, 80, 160, STANDARD_COLORS.INHERIT, "1 & 2"],
    [BET_NAMES.PAIR1_3]: [280, 380, 80, 160, STANDARD_COLORS.INHERIT, "1 & 3"],
    [BET_NAMES.PAIR1_4]: [360, 380, 80, 160, STANDARD_COLORS.INHERIT, "1 & 4"],
    [BET_NAMES.PAIR1_5]: [440, 380, 80, 160, STANDARD_COLORS.INHERIT, "1 & 5"],
    [BET_NAMES.PAIR1_6]: [520, 380, 80, 160, STANDARD_COLORS.INHERIT, "1 & 6"],
    [BET_NAMES.PAIR2_3]: [600, 380, 80, 160, STANDARD_COLORS.INHERIT, "2 & 3"],
    [BET_NAMES.PAIR2_4]: [680, 380, 80, 160, STANDARD_COLORS.INHERIT, "2 & 4"],
    [BET_NAMES.PAIR2_5]: [760, 380, 80, 160, STANDARD_COLORS.INHERIT, "2 & 5"],
    [BET_NAMES.PAIR2_6]: [840, 380, 80, 160, STANDARD_COLORS.INHERIT, "2 & 6"],
    [BET_NAMES.PAIR3_4]: [920, 380, 80, 160, STANDARD_COLORS.INHERIT, "3 & 4"],
    [BET_NAMES.PAIR3_5]: [1000, 380, 80, 160, STANDARD_COLORS.INHERIT, "3 & 5"],
    [BET_NAMES.PAIR3_6]: [1080, 380, 80, 160, STANDARD_COLORS.INHERIT, "3 & 6"],
    [BET_NAMES.PAIR4_5]: [1160, 380, 80, 160, STANDARD_COLORS.INHERIT, "4 & 5"],
    [BET_NAMES.PAIR4_6]: [1240, 380, 80, 160, STANDARD_COLORS.INHERIT, "4 & 6"],
    [BET_NAMES.PAIR5_6]: [1320, 380, 80, 160, STANDARD_COLORS.INHERIT, "5 & 6"],
    [BET_NAMES.ONE]: [0, 540, 220, 80, STANDARD_COLORS.INHERIT, "1"],
    [BET_NAMES.TWO]: [230, 540, 220, 80, STANDARD_COLORS.INHERIT, "2"],
    [BET_NAMES.THREE]: [460, 540, 220, 80, STANDARD_COLORS.INHERIT, "3"],
    [BET_NAMES.FOUR]: [690, 540, 220, 80, STANDARD_COLORS.INHERIT, "4"],
    [BET_NAMES.FIVE]: [920, 540, 220, 80, STANDARD_COLORS.INHERIT, "5"],
    [BET_NAMES.SIX]: [1180, 540, 220, 80, STANDARD_COLORS.INHERIT, "6"],
}).reduce((acc, [betOptionName, params]) => {
    acc[betOptionName] = {
        styleData: {
            left: params[0],
            top: params[1],
            width: params[2],
            height: params[3],
            backgroundColor: params[4],
        },
        displayText: params[5],
    };
    return acc;
}, {});

export { ClickableSicBoBet, BET_OPTION_DISPLAY_PARAMS };