import { getWheelNumberColor } from "../common/getWheelNumberColor";

export function SpinResult(props) {
    return (
        <div className="spin-result-container">
            <div
                className="spin-result-label"
                style={{
                    backgroundColor: getWheelNumberColor(props.spinResult),
                }}
            >
                {props.spinResult}
            </div>
        </div>
    );
}
