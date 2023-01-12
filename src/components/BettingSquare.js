export function BettingSquare(props) {
    const fontColor = "#FFFFFF";
    const bgColor = getRouletteNumberColor(props.betName);
    const betAmountText = props.betAmount > 0 ?
        "$" + props.betAmount :
        String.fromCharCode(160); // non-breaking space

    return (
        <button
            className={`betting-square-${props.betName}`}
            onClick={props.onClick}
            style={{
                backgroundColor: bgColor,
                color: fontColor,
                left: props.positionData.left,
                top: props.positionData.top,
            }}
        >
            <span className="square-label">{props.betName}</span>
            <br />
            <br />
            <span className="square-bet-amount">{betAmountText}</span>
        </button>
    );
}

const getRouletteNumberColor = (betName) => {
    const redNumbers = ["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"];
    return redNumbers.includes(betName) ? "#d94848" : "#222222";
}
