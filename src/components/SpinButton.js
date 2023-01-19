export function SpinButton(props) {
    const zIndex = props.isSpinAllowed ? -1 : 1;
    const color = props.isSpinAllowed ? 'inherit' : '#999999';
    return (
        <div
            className="spin-button"
            onClick={props.onClick}
        >
            <span
                style={{
                    color: color,
                }}
            >
                SPIN
            </span>
            <span
                className="place-a-bet-message"
                style={{
                    zIndex: zIndex,
                }}
            >
                Place a bet!
            </span>
        </div>
    );
}
