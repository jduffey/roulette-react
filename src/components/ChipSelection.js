import { Chip } from "./Chip";

export function ChipSelection(props) {
    return (
        <div
            className="chip-selection-bar"
        >
            {[1, 5, 25, 100, 500, 1000].map((chipAmount) => {
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
