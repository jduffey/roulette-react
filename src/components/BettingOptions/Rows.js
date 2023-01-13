export function Rows(props) {
    const betAmountText = props.betAmount > 0 ?
        "$" + props.betAmount :
        String.fromCharCode(160); // non-breaking space

    return (
        <div
            className={`betting-square-visible betting-square-${props.betName}`}
            onClick={props.onClick}
            style={{
                left: props.styleData.left,
                top: props.styleData.top,
                height: props.styleData.height,
                width: props.styleData.width,
                backgroundColor: props.styleData.backgroundColor,
            }}
        >
            <div
                className="square-label"
                style={{
                    fontSize: "20px",
                }}
            >
                {props.displayLabel}
            </div>
            <div className="square-bet-amount">
                {betAmountText}
            </div>
        </div>
    );
}
