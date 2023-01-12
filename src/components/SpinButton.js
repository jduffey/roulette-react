export function SpinButton(props) {
    return (
        <div>
            <button
                className="spin-button"
                onClick={props.onClick}
            >
                {"SPIN"}
            </button>
        </div>
    );
}
