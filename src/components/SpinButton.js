export function SpinButton(props) {
    const zIndex = props.isSpinAllowed ? -1 : 1;
    return (
        <div
            className="spin-button"
            onClick={props.onClick}
        >
            <span>
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
