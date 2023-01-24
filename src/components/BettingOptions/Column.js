import { Chip } from "../Chip";
import { BETTING_SQUARE_OUTLINE_SIZE } from "../../common/project-globals";

const sizeData = {
    width: 80 - BETTING_SQUARE_OUTLINE_SIZE,
    height: 120 - BETTING_SQUARE_OUTLINE_SIZE,
}

export function Column(props) {
    return (
        <div
            className={`betting-square-visible betting-square-${props.betName}`}
            onClick={props.onClick}
            style={{
                left: props.styleData.left,
                top: props.styleData.top,
                height: sizeData.height,
                width: sizeData.width,
                backgroundColor: props.styleData.backgroundColor,
            }}
        >
            <div className="betting-square-contents">
                <div
                    className="betting-square-label column-square-label"
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
