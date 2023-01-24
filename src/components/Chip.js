const getChipColorStyles = (chipAmt) => {
    switch (true) {
        case (chipAmt >= 1 && chipAmt < 5):
            return {
                backgroundColor: "#DFDFDF",
                color: "#000000",
                borderColor: "#000000",
            };
        case (chipAmt >= 5 && chipAmt < 25):
            return {
                backgroundColor: "#D94848",
                color: "#FFFFFF",
                borderColor: "#000000",
            };
        case (chipAmt >= 25 && chipAmt < 100):
            return {
                backgroundColor: "#00B341",
                color: "#FFFFFF",
                borderColor: "#000000",
            };
        case (chipAmt >= 100 && chipAmt < 500):
            return {
                backgroundColor: "#222222",
                color: "#FFFFFF",
                borderColor: "#2A8A8A",
            };
        case (chipAmt >= 500 && chipAmt < 1000):
            return {
                backgroundColor: "#663399",
                color: "#FFFFFF",
                borderColor: "#2A8A8A",
            };
        case (chipAmt >= 1000):
            return {
                backgroundColor: "#F4F488",
                color: "#000000",
                borderColor: "#000000",
            };
        default:
            return {
                display: "none",
            };
    }
}

export function Chip(props) {
    const styles = getChipColorStyles(props.chipAmount);
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
            {`$${props.chipAmount}`}
        </div>
    );
}
