import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import { rouletteContractEvents } from "../../common/blockchainWrapper";

const CLASS_NAME = "MostRecentSpinResults-component";
export function MostRecentSpinResults(props) {
    const [spinResults, setSpinResults] = useState([]);

    rouletteContractEvents.on('WheelNumber', (playerAddress, wheelNumber) => {
        console.log("WheelNumber event: ", wheelNumber, playerAddress);
        if (playerAddress === props.playerAddress) {
            console.log(`WheelNumber event: ${wheelNumber}, ${playerAddress}`);
            const copySpinResults = [...spinResults];
            copySpinResults.push(parseInt(wheelNumber));
            setSpinResults(copySpinResults);
        }
    });

    useEffect(() => {
        console.log("MostRecentSpinResults useEffect");
        console.log("spinResults", spinResults);
    }, [spinResults, props.playerAddress]);

    const numberOfResultsToDisplay = 20;
    const truncatedSpinResults = spinResults.slice(-numberOfResultsToDisplay);
    return (
        <div
            className={CLASS_NAME}
        >
            <ul>
                {truncatedSpinResults.map((_, i, arr) => {
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
