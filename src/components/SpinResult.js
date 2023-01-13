export function SpinResult(props) {
    return (
        <div className="spin-result-container">
            <div
                className="spin-result-label"
                style={{
                    backgroundColor: props.bgColor,
                }}
            >
                {props.spinResult}
            </div>
        </div>
    );
}
