import { Chip } from "./Chip";
import { BETTING_SQUARE_OUTLINE_SIZE } from "../common/project-globals";

export function BetOption(props) {
    return (
        <div
            className={`betting-square-visible betting-square-${props.betName}`}
            onClick={props.onClick}
            style={{
                left: props.styleData.left,
                top: props.styleData.top,
                height: props.styleData.height - BETTING_SQUARE_OUTLINE_SIZE,
                width: props.styleData.width - BETTING_SQUARE_OUTLINE_SIZE,
                backgroundColor: props.styleData.backgroundColor,
            }}
        >
            <div className="betting-square-contents">
                <div
                    className={`betting-square-label ${props.classNamePrefix}-square-label`}
                    style={{
                        backgroundColor: props.styleData.labelBackgroundColor,
                    }}
                >
                    {props.displayLabel}
                </div>
                <Chip
                    key={props.chipAmount}
                    onClick={props.onClick}
                    className="betting-square-chip"
                    chipAmount={props.betAmount}
                />
            </div>
        </div>
    );
}
