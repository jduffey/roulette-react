export function StraightUp1To36(props) {
    const fontColor = "#FFFFFF";
    const betAmountText = props.betAmount > 0 ?
        "$" + props.betAmount :
        String.fromCharCode(160); // non-breaking space

    return (
        <button
            className={`betting-square-${props.betName}`}
            onClick={props.onClick}
            style={{
                color: fontColor,
                left: props.styleData.left,
                top: props.styleData.top,
                height: props.styleData.height,
                width: props.styleData.width,
                backgroundColor: props.styleData.backgroundColor,
            }}
        >
            <span className="square-label">{props.displayLabel}</span>
            <br />
            <br />
            <span className="square-bet-amount">{betAmountText}</span>
        </button>
    );
}
