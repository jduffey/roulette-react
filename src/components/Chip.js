export function Chip(props) {
    return (
        <div
            className={`chip chip-amount-${props.chipAmount}`}
            onClick={() => props.onClick(props.chipAmount)}
        >
            {props.chipAmount}
        </div>
    )
}