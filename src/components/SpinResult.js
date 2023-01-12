export function SpinResult(props) {
    return (
        <div className="spin-result">
            <div className="spin-result-title">
                {"Result:"}
            </div>
            <div className="spin-result-number">
                {props.spinResult}
            </div>
        </div>
    );
}
