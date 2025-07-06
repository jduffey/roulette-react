import { useEffect, useState } from 'react';

import { WHEEL_NUMBERS } from "../../common/wheelNumbers";

import { getPlayerNumberCompletionSetCurrent, rouletteContractEvents } from "../../common/blockchainWrapper";

const CLASS_NAME = "NumbersHitTracker-component";
export function NumbersHitTracker(props) {
    const [currentSet, setCurrentSet] = useState(new Set());

    // Initialize the current set on component mount
    useEffect(() => {
        const initializeSet = async () => {
            try {
                const currentNumbers = await getPlayerNumberCompletionSetCurrent(props.playerAddress);
                setCurrentSet(new Set(currentNumbers));
            } catch (error) {
                console.error('Error initializing numbers hit tracker:', error);
            }
        };
        
        initializeSet();
    }, [props.playerAddress]);

    // Listen for ExecutedWager events to update the set immediately
    useEffect(() => {
        const handleExecutedWager = async (playerAddress, wheelNumber, totalWinnings, totalBetsReturned) => {
            if (playerAddress === props.playerAddress) {
                try {
                    // Get the updated completion set from the blockchain
                    const currentNumbers = await getPlayerNumberCompletionSetCurrent(props.playerAddress);
                    setCurrentSet(new Set(currentNumbers));
                } catch (error) {
                    console.error('Error updating numbers hit tracker:', error);
                }
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
