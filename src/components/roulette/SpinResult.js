import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import {
    rouletteContractEvents,
} from "../../common/blockchainWrapper";

const CLASS_NAME = "SpinResult-component";
export function SpinResult(props) {
    // console.log("SpinResult props", props);
    const [mostRecentSpinResult, setMostRecentSpinResult] = useState("-");

    useEffect(() => {
        if (props.spinResult) {
            setMostRecentSpinResult(props.spinResult);
        } else {
            rouletteContractEvents.on('WheelNumber', (playerAddress, wheelNumber) => {
                if (playerAddress === props.playerAddress) {
                    setMostRecentSpinResult(parseInt(wheelNumber));
                }
            });
        }
    }, [mostRecentSpinResult, props.spinResult, props.playerAddress]);

    let bgColor = "inherit";
    // const awaitingSpinResultText = "...";
    // if (props.spinResult) {
    //     bgColor = getWheelNumberColor(props.spinResult);
    // }
    // const wheelNumberText = props.spinResult
    //     ? props.spinResult
    //     : awaitingSpinResultText;

    // TODO: convert 37 to display as 00
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
                {mostRecentSpinResult}
            </div>
        </div>
    );
}
