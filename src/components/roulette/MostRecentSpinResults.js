import { useEffect, useState } from "react";

import { getWheelNumberColor } from "../../common/getWheelNumberColor";

import { rouletteContractEvents } from "../../common/blockchainWrapper";

const CLASS_NAME = "MostRecentSpinResults-component";
export function MostRecentSpinResults(props) {
    const [spinResults, setSpinResults] = useState([]);

    useEffect(() => {
        const handleExecutedWager = (playerAddress, wheelNumber) => {
            if (playerAddress === props.playerAddress) {
                setSpinResults(prevResults => {
                    const newResults = [...prevResults, parseInt(wheelNumber, 10)];
                    return newResults.slice(-20); // Only keep the last 20 results
                });
            }
        };

        rouletteContractEvents.on('ExecutedWager', handleExecutedWager);

        // Cleanup function to remove event listener
        return () => {
            rouletteContractEvents.off('ExecutedWager', handleExecutedWager);
        };
    }, [props.playerAddress]);

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
                            {wheelNumber === 37 ? "00" : wheelNumber}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
