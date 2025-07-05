import { useEffect, useState, useRef } from 'react';

import { WHEEL_NUMBERS } from "../../common/wheelNumbers";

import { getPlayerNumberCompletionSetCurrent, rouletteContractEvents } from "../../common/blockchainWrapper";

const CLASS_NAME = "NumbersHitTracker-component";
export function NumbersHitTracker(props) {
    const [currentSet, setCurrentSet] = useState(new Set());
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchCurrentSet = async () => {
            try {
                const currentNumbers = await getPlayerNumberCompletionSetCurrent(props.playerAddress);
                setCurrentSet(new Set(currentNumbers));
            } catch (error) {
                console.error("Error fetching current number set:", error);
            }
        };

        // Initial fetch
        fetchCurrentSet();

        // Listen for new spins
        const handleExecutedWager = (playerAddress, wheelNumber) => {
            if (playerAddress === props.playerAddress) {
                // Debounce the fetch to avoid rapid updates
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                timerRef.current = setTimeout(() => {
                    fetchCurrentSet();
                }, 500);
            }
        };

        rouletteContractEvents.on('ExecutedWager', handleExecutedWager);

        // Cleanup
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            rouletteContractEvents.off('ExecutedWager', handleExecutedWager);
        };
    }, [props.playerAddress]);

    return (
        <div
            className={CLASS_NAME}
        >
            {Object.values(WHEEL_NUMBERS).map((stringyNumber, i) => {

                const wheelNumber = stringyNumber === "00"
                    ? 37
                    : parseInt(stringyNumber, 10);

                const backgroundColor = currentSet.has(wheelNumber) ?
                    "yellow" :
                    "inherit";
                const color = currentSet.has(wheelNumber) ?
                    "black" :
                    "gray";
                return (
                    <div className="hit-number"
                        key={i}
                        style={{
                            backgroundColor,
                            color,
                        }}
                    >
                        {wheelNumber === 37 ? "00" : wheelNumber}
                    </div>
                );
            })}
        </div>
    );
}
