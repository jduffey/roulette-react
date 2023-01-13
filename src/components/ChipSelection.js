import { Chip } from "./Chip";

export function ChipSelection(props) {
    return (
        <div
            className="chip-selection-bar"
        >
            {Chip({ chipAmount: 1, onClick: props.onClick })}
            {Chip({ chipAmount: 5, onClick: props.onClick })}
            {Chip({ chipAmount: 25, onClick: props.onClick })}
            {Chip({ chipAmount: 100, onClick: props.onClick })}
            {Chip({ chipAmount: 500, onClick: props.onClick })}
            {Chip({ chipAmount: 1000, onClick: props.onClick })}
        </div>
    );
}
