import { getWheelNumberColor } from "../common/getWheelNumberColor";

const CLASS_NAME = "SpinResult-component";
export function SpinResult(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            {(() => {
                if (props.spinResult) {
                    return (
                        <div
                            className="spin-result-label"
                            style={{
                                backgroundColor: getWheelNumberColor(props.spinResult),
                            }}
                        >
                            {props.spinResult}
                        </div>
                    );
                }
                return null;
            })()}
        </div>
    );
}
