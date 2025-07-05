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
        }
    }, [props.spinResult]);

    useEffect(() => {
        const handleExecutedWager = (playerAddress, wheelNumber, totalWinnings, totalBetsReturned) => {
            if (playerAddress === props.playerAddress) {
                const wheelNum = parseInt(wheelNumber, 10);
                setBgColor(getWheelNumberColor(wheelNum));
                setMostRecentSpinResultText(wheelNum === 37 ? "00" : wheelNum);
            }
        };

        rouletteContractEvents.on('ExecutedWager', handleExecutedWager);

        // Cleanup event listener
        return () => {
            rouletteContractEvents.off('ExecutedWager', handleExecutedWager);
        };
    }, [props.playerAddress]);

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
