import { Chip, CHIP_AMOUNTS } from "./Chip";

const CLASS_NAME = "ChipSelection-component";
export function ChipSelection(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            {[
                CHIP_AMOUNTS.CHIP_1,
                CHIP_AMOUNTS.CHIP_5,
                CHIP_AMOUNTS.CHIP_25,
                CHIP_AMOUNTS.CHIP_100,
                CHIP_AMOUNTS.CHIP_500,
                CHIP_AMOUNTS.CHIP_1000,
            ].map((chipAmount) => {
                const isSelected = props.currentChipAmountSelected === chipAmount;

                return Chip({
                    id: `chip-${chipAmount}`,
                    key: chipAmount,
                    auxiliaryClassName: "chip-selection-chip",
                    chipAmount,
                    onClick: props.onClick,
                    isSelected,
                });
            })}
        </div>
    );
}
