import { Chip } from "./Chip";

export function ChipSelection(props) {
    const isSelectedChip = (chipAmount) => {
        return props.currentChipAmountSelected === chipAmount;
    };
    return (
        <div
            className="chip-selection-bar"
        >
            {Chip({ chipAmount: 1, onClick: props.onClick, isSelected: isSelectedChip(1) })}
            {Chip({ chipAmount: 5, onClick: props.onClick, isSelected: isSelectedChip(5) })}
            {Chip({ chipAmount: 25, onClick: props.onClick, isSelected: isSelectedChip(25) })}
            {Chip({ chipAmount: 100, onClick: props.onClick, isSelected: isSelectedChip(100) })}
            {Chip({ chipAmount: 500, onClick: props.onClick, isSelected: isSelectedChip(500) })}
            {Chip({ chipAmount: 1000, onClick: props.onClick, isSelected: isSelectedChip(1000) })}
        </div>
    );
}
