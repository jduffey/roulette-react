export function BettingSquare(props) {
    const bgColor = props.isSelected ? "lightgreen" : "inherit";
    const betAmountText = props.betAmount > 0 ?
        "$" + props.betAmount :
        String.fromCharCode(160); // non-breaking space

    return (
        <button
            className="betting-square"
            onClick={props.onClick}
            style={{ backgroundColor: bgColor }}
        >
            <span className="square-label">{props.label}</span>
            <br />
            <span className="square-bet-amount">{betAmountText}</span>
        </button>
    );
}
