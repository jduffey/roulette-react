import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import { rouletteContractEvents } from "../../common/blockchainWrapper";

const CLASS_NAME = "SpinResult-component";
export function SpinResult(props) {
    const [mostRecentSpinResultText, setMostRecentSpinResultText] = useState("-");
    const [bgColor, setBgColor] = useState("inherit");

    useEffect(() => {
        if (props.spinResult) {
            setBgColor(getWheelNumberColor(props.spinResult));
            setMostRecentSpinResultText(props.spinResult === 37 ? "00" : props.spinResult);
        } else {
            rouletteContractEvents.on('ExecutedWager', (playerAddress, wheelNumber) => {
                if (playerAddress === props.playerAddress) {
                    setBgColor(getWheelNumberColor(parseInt(wheelNumber, 10)));
                    setMostRecentSpinResultText(parseInt(wheelNumber, 10) === 37 ? "00" : parseInt(wheelNumber, 10));
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
