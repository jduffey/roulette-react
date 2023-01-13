export function Chip(props) {
    const shadow = props.isSelected ? "2px 6px 4px 4px rgba(0,0,0,.6)" : "";
    return (
        <div
            className={`chip chip-amount-${props.chipAmount}`}
            onClick={() => props.onClick(props.chipAmount)}
            style={{ boxShadow: shadow }}
        >
            {props.chipAmount}
        </div>
    )
}