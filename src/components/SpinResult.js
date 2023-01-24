import { getWheelNumberColor } from "../common/getWheelNumberColor";
import { STANDARD_COLORS } from "../common/standardColors";

export function SpinResult(props) {
    return (
        <div className="spin-result-container">
            <div
                className="spin-result-label"
                style={{
                    backgroundColor: getWheelNumberColor(props.spinResult) || STANDARD_COLORS.INHERIT,
                }}
            >
                {props.spinResult}
            </div>
        </div>
    );
}
