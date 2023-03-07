import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import {
    rouletteContractEvents,
} from "../../common/blockchainWrapper";

const CLASS_NAME = "SpinResult-component";
export function SpinResult(props) {
    // console.log("SpinResult props", props);
    const [mostRecentSpinResultText, setMostRecentSpinResultText] = useState("-");

    useEffect(() => {
        if (props.spinResult) {
            setMostRecentSpinResultText(props.spinResult === 37 ? "00" : props.spinResult);
        } else {
            rouletteContractEvents.on('WheelNumber', (playerAddress, wheelNumber) => {
                if (playerAddress === props.playerAddress) {
                    setMostRecentSpinResultText(parseInt(wheelNumber) === 37 ? "00" : parseInt(wheelNumber));
                }
            });
        }
    }, [mostRecentSpinResultText, props.spinResult, props.playerAddress]);

    const bgColor = "inherit";

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
