import { CHIP_COLORS } from "../../common/standardColors";

const CHIP_AMOUNTS = {
    CHIP_1: 1,
    CHIP_5: 5,
    CHIP_25: 25,
    CHIP_100: 100,
    CHIP_500: 500,
    CHIP_1000: 1000,
};

const getChipColorStyles = (chipAmt) => {
    switch (true) {
        case (chipAmt >= CHIP_AMOUNTS.CHIP_1 && chipAmt < CHIP_AMOUNTS.CHIP_5):
            return Object.assign({}, CHIP_COLORS.CHIP_1);
        case (chipAmt >= CHIP_AMOUNTS.CHIP_5 && chipAmt < CHIP_AMOUNTS.CHIP_25):
            return Object.assign({}, CHIP_COLORS.CHIP_5);
        case (chipAmt >= CHIP_AMOUNTS.CHIP_25 && chipAmt < CHIP_AMOUNTS.CHIP_100):
            return Object.assign({}, CHIP_COLORS.CHIP_25);
        case (chipAmt >= CHIP_AMOUNTS.CHIP_100 && chipAmt < CHIP_AMOUNTS.CHIP_500):
            return Object.assign({}, CHIP_COLORS.CHIP_100);
        case (chipAmt >= CHIP_AMOUNTS.CHIP_500 && chipAmt < CHIP_AMOUNTS.CHIP_1000):
            return Object.assign({}, CHIP_COLORS.CHIP_500);
        case (chipAmt >= CHIP_AMOUNTS.CHIP_1000):
            return Object.assign({}, CHIP_COLORS.CHIP_1000);
        default:
            return { display: "none" };
    }
}

const CLASS_NAME = "Chip-component";
function Chip(props) {
    const styles = getChipColorStyles(props.chipAmount);
    if (props.isSelected) {
        styles.boxShadow = "0px 16px 10px 1px rgba(0, 0, 0, 0.6)";
        styles.marginTop = "12px";
    }

    return (
        <div
            className={`${CLASS_NAME} ${props.auxiliaryClassName}`}
            id={props.id}
            key={props.chipAmount}
            onClick={() => props.onClick(props.chipAmount)}
            style={styles}
        >
            {`$${props.chipAmount}`}
        </div>
    );
}

export { Chip, CHIP_AMOUNTS }
