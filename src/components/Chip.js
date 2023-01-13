export function Chip(props) {
    const styles = getChipStyles(props.chipAmount);
    if (props.isSelected) {
        styles.boxShadow = "2px 6px 4px 4px rgba(0,0,0,.6)";
    }

    return (
        <div
            key={props.chipAmount}
            className={`chip chip-amount-${props.chipAmount}`}
            onClick={() => props.onClick(props.chipAmount)}
            style={styles}
        >
            {props.chipAmount}
        </div>
    )
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
        bgColor = "#00b341";
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

    return {
        display: betAmount > 0 ? "" : "none",
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: color,
    };
}
