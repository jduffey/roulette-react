// import { Chip } from "./Chip";

const BETTING_SQUARE_OUTLINE_SIZE = 1;

const CLASS_NAME = "BetOption-component";
export function BetOption(props) {
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
