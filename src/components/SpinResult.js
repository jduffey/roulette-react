import { getWheelNumberColor } from "../common/getWheelNumberColor";

const CLASS_NAME = "SpinResult-component";
export function SpinResult(props) {
    let bgColor = "inherit";
    let wheelNumberText = "?";
    if (props.spinResult) {
        bgColor = getWheelNumberColor(props.spinResult);
        wheelNumberText = props.spinResult;
    }

    return (
        <div
            className={CLASS_NAME}
        >
            <div
                className="spin-result-label"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {wheelNumberText}
            </div>
        </div>
    );
}
