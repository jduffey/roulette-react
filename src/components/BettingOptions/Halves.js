export function Halves(props) {
    const betAmountText = "$" + props.betAmount;
    const isVisible = props.betAmount > 0 ? "" : "none";

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
            <div className="betting-square-contents">
                <div
                    className="betting-square-label halves-square-label"
                >
                    {props.displayLabel}
                </div>
                <div
                    className="betting-square-chip"
                    style={getChipStyles(props.betAmount)}
                >
                    {betAmountText}
                </div>
            </div>
        </div >
    );
}

function getChipStyles(betAmount) {
    let bgColor;
    let borderColor = "#222222";
    let color = "white";
    if (betAmount < 5) {
        bgColor = "#dfdfdf";
        color = "black";
    } else if (betAmount < 25) {
        bgColor = "#d94848";
    } else if (betAmount < 100) {
        bgColor = "#016D29";
    } else if (betAmount < 500) {
        bgColor = "#222222";
        borderColor = "#2a8a8a";
    } else if (betAmount < 1000) {
        bgColor = "rebeccapurple";
        borderColor = "#2a8a8a";
    } else {
        bgColor = "#f4f488";
        color = "black";
    }

    const chipStyles = {
        display: betAmount > 0 ? "" : "none",
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: color,
    };
    return chipStyles;
}