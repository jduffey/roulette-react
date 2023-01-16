import { Chip } from "../Chip";
import { BETTING_SQUARE_OUTLINE_SIZE } from "../../common/project-globals";

const sizeData = {
    width: 160 - BETTING_SQUARE_OUTLINE_SIZE,
    height: 80 - BETTING_SQUARE_OUTLINE_SIZE
}

export function Halves(props) {
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
                    className="betting-square-label halves-square-label"
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
        </div >
    );
}
