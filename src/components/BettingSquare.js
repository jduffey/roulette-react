export function BettingSquare(props) {
    const fontColor = "#FFFFFF";
    const bgColor = getRouletteNumberColor(props.label);
    const betAmountText = props.betAmount > 0 ?
        "$" + props.betAmount :
        String.fromCharCode(160); // non-breaking space

    return (
        <button
            className="betting-square"
            onClick={props.onClick}
            style={{
                backgroundColor: bgColor,
                color: fontColor
            }}
        >
            <span className="square-label">{props.label}</span>
            <br />
            <br />
            <span className="square-bet-amount">{betAmountText}</span>
        </button>
    );
}

const getRouletteNumberColor = (i) => {
    // TODO this will be replaced/refactored once we have all of the betting options on the board (e.g. even, odd)
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    // const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    return redNumbers.includes(i) ? "#d94848" : "#222222";
}
