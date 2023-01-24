import { getWheelNumberColor } from "../common/getWheelNumberColor";

export function SpinResult(props) {
    return (
        <div className="spin-result-container">
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
