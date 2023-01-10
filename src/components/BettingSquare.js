export function BettingSquare(props) {
    const bgColor = props.isSelected ? "lightgreen" : "inherit";
    return (
        <button
            style={{ backgroundColor: bgColor }}
            className='square'
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
}
