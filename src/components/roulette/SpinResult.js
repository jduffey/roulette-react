import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import {
    rouletteContractEvents,
} from "../../common/blockchainWrapper";

const CLASS_NAME = "SpinResult-component";
export function SpinResult(props) {
    const [wheelNumber, setWheelNumber] = useState("?");

    useEffect(() => {

        rouletteContractEvents.on('WheelNumber', (playerAddress, wheelNumber) => {
            if (playerAddress === props.playerAddress) {
                console.log(`WheelNumber event: ${wheelNumber}, ${playerAddress}`);
                setWheelNumber(parseInt(wheelNumber));
            }
        });

    }, [wheelNumber, props.playerAddress]);

    // console.log("SpinResult props", props);
    let bgColor = "inherit";
    // const awaitingSpinResultText = "...";
    // if (props.spinResult) {
    //     bgColor = getWheelNumberColor(props.spinResult);
    // }
    // const wheelNumberText = props.spinResult
    //     ? props.spinResult
    //     : awaitingSpinResultText;

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
                {wheelNumber}
            </div>
        </div>
    );
}
