import { Chip } from "./Chip";

export function ChipSelection(props) {
    const isSelectedChip = (chipAmount) => {
        return props.currentChipAmountSelected === chipAmount;
    };
    return (
        <div
            className="chip-selection-bar"
        >
            {[1, 5, 25, 100, 500, 1000].map((chipAmount) => {
                return Chip({
                    key: chipAmount,
                    className: "chip-selection-chip",
                    chipAmount: chipAmount,
                    onClick: props.onClick,
                    isSelected: isSelectedChip(chipAmount)
                });
            })}
        </div>
    );
}
