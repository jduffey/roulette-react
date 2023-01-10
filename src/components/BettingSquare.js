export function BettingSquare(props) {
    const bgColor = props.isWinningSquare ? "lightgreen" : "inherit";
    return (
        <button
            style={{ backgroundColor: bgColor }}
            className='square'
            onClick={props.onClick}
        >
            {props.playerMark}
        </button>
    );
}
