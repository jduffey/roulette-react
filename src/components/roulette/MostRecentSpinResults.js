import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import { rouletteContractEvents } from "../../common/blockchainWrapper";

const CLASS_NAME = "MostRecentSpinResults-component";
export function MostRecentSpinResults(props) {
    const [spinResults, setSpinResults] = useState([]);

    rouletteContractEvents.on('WheelNumber', (playerAddress, wheelNumber) => {
        if (playerAddress === props.playerAddress) {
            const copySpinResults = [...spinResults.slice(-20)]; // Only keep the last 20 results
            copySpinResults.push(parseInt(wheelNumber));
            setSpinResults(copySpinResults);
        }
    });

    useEffect(() => {
    }, [spinResults, props.playerAddress]);

    return (
        <div
            className={CLASS_NAME}
        >
            <ul>
                {spinResults.map((_, i, arr) => {
                    const wheelNumber = arr[arr.length - 1 - i];
                    return (
                        <div className="recent-spin-result"
                            key={i}
                            style={{
                                backgroundColor: getWheelNumberColor(wheelNumber),
                            }}
                        >
                            {wheelNumber}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
