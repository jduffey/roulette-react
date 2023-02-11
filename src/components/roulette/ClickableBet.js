import { Chip } from "./Chip";

const BETTING_SQUARE_OUTLINE_SIZE = 1;

const CLASS_NAME = "BetOption-component";
export function ClickableBet(props) {
    return (
        <div
            className={CLASS_NAME}
            onClick={props.onClick}
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
