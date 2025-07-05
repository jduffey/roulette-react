import { useEffect, useState } from 'react';

import { WHEEL_NUMBERS } from "../../common/wheelNumbers";

import { getPlayerNumberCompletionSetCurrent } from "../../common/blockchainWrapper";

const CLASS_NAME = "NumbersHitTracker-component";
export function NumbersHitTracker(props) {
    const [currentSet, setCurrentSet] = useState(new Set());
    const [previousSet, setPreviousSet] = useState(new Set());
    const [newlyHitNumbers, setNewlyHitNumbers] = useState(new Set());
    const [flashState, setFlashState] = useState(false);

    useEffect(() => {
        setTimeout(async () => {
            const currentNumbers = await getPlayerNumberCompletionSetCurrent(props.playerAddress);
            const newSet = new Set(currentNumbers);
            
            // Find newly hit numbers (numbers in current set but not in previous set)
            const newlyHit = new Set([...newSet].filter(num => !currentSet.has(num)));
            
            if (newlyHit.size > 0) {
                setNewlyHitNumbers(newlyHit);
                
                // Start flashing animation for newly hit numbers
                // Flash for 3 seconds (3000ms) at twice per second (500ms intervals)
                const flashInterval = setInterval(() => {
                    setFlashState(prev => !prev);
                }, 500);
                
                // Stop flashing after 3 seconds
                setTimeout(() => {
                    clearInterval(flashInterval);
                    setNewlyHitNumbers(new Set()); // Clear newly hit numbers
                    setFlashState(false);
                }, 3000);
            }
            
            setPreviousSet(currentSet);
            setCurrentSet(newSet);
        }, 1000);
    }, [props.playerAddress, currentSet]);

    return (
        <div
            className={CLASS_NAME}
        >
            {Object.values(WHEEL_NUMBERS).map((stringyNumber, i) => {

                const wheelNumber = stringyNumber === "00"
                    ? 37
                    : parseInt(stringyNumber, 10);

                const isHit = currentSet.has(wheelNumber);
                const isNewlyHit = newlyHitNumbers.has(wheelNumber);
                
                let backgroundColor;
                if (isNewlyHit) {
                    // Flash between orange and yellow for newly hit numbers
                    backgroundColor = flashState ? "orange" : "yellow";
                } else if (isHit) {
                    // Regular yellow for previously hit numbers
                    backgroundColor = "yellow";
                } else {
                    // Default background for non-hit numbers
                    backgroundColor = "inherit";
                }

                const color = isHit ? "black" : "gray";

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
