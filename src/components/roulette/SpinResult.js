import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import {
    rouletteContractEvents,
} from "../../common/blockchainWrapper";

const CLASS_NAME = "SpinResult-component";
export function SpinResult(props) {
    const [mostRecentSpinResultText, setMostRecentSpinResultText] = useState("-");
    const [bgColor, setBgColor] = useState("inherit");

    useEffect(() => {
        if (props.spinResult) {
            setBgColor(getWheelNumberColor(props.spinResult));
            setMostRecentSpinResultText(props.spinResult === 37 ? "00" : props.spinResult);
        } else {
            rouletteContractEvents.on('WheelNumber', (playerAddress, wheelNumber) => {
                if (playerAddress === props.playerAddress) {
                    setBgColor(getWheelNumberColor(parseInt(wheelNumber)));
                    setMostRecentSpinResultText(parseInt(wheelNumber) === 37 ? "00" : parseInt(wheelNumber));
                }
            });
        }
    }, [mostRecentSpinResultText, props.spinResult, props.playerAddress]);

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
                {mostRecentSpinResultText}
            </div>
        </div>
    );
}
