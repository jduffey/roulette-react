export function Chip(props) {
    const styles = getChipStyles(props.chipAmount);
    if (props.isSelected) {
        styles.boxShadow = "0px 8px 6px 4px rgba(0,0,0,.6)";
        styles.marginTop = "12px";
    }

    return (
        <div
            id={props.id}
            key={props.chipAmount}
            className={props.className}
            onClick={() => props.onClick(props.chipAmount)}
            style={styles}
        >
            {"$" + props.chipAmount}
        </div>
    )
}

function getChipStyles(betAmount) {
    let bgColor;
    let borderColor;
    let color;
    if (betAmount < 5) {
        bgColor = "#DFDFDF";
        color = "#000000";
        borderColor = "#000000";
    } else if (betAmount < 25) {
        bgColor = "#D94848";
        color = "#FFFFFF";
        borderColor = "#000000";
    } else if (betAmount < 100) {
        bgColor = "#00B341";
        color = "#FFFFFF";
        borderColor = "#000000";
    } else if (betAmount < 500) {
        bgColor = "#222222";
        color = "#FFFFFF";
        borderColor = "#2A8A8A";
    } else if (betAmount < 1000) {
        bgColor = "#663399";
        color = "#FFFFFF";
        borderColor = "#2A8A8A";
    } else {
        bgColor = "#F4F488";
        color = "#000000";
        borderColor = "#000000";
    }

    return {
        display: betAmount > 0 ? "" : "none",
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: color,
    };
}
