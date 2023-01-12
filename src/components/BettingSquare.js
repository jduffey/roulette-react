export function BettingSquare(props) {
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
                left: props.positionData.left,
                top: props.positionData.top,
                height: props.positionData.height,
                width: props.positionData.width,
                backgroundColor: props.positionData.backgroundColor,
            }}
        >
            <span className="square-label">{props.betName}</span>
            <br />
            <br />
            <span className="square-bet-amount">{betAmountText}</span>
        </button>
    );
}
