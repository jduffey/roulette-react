import { Chip, CHIP_AMOUNTS } from "./Chip";

export function ChipSelection(props) {
    return (
        <div
            className="chip-selection-bar"
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
                    className: "chip-selection-chip",
                    chipAmount,
                    onClick: props.onClick,
                    isSelected,
                });
            })}
        </div>
    );
}
