const CLASS_NAME = 'SpinButton-component';
export function SpinButton(props) {
    const zIndex = props.isSpinAllowed ? -1 : 1;
    const color = props.isSpinAllowed ? 'inherit' : '#999999';
    return (
        <div
            id="spin-button"
            className={CLASS_NAME}
            onClick={() => props.onClick()}
            role="button"
        >
            <span
                style={{
                    color,
                }}
            >
                SPIN
            </span>
            <span
                className="place-a-bet-message"
                style={{
                    zIndex,
                }}
            >
                Place a bet!
            </span>
        </div>
    );
}
