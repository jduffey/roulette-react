import { useEffect, useState } from 'react';

import { WHEEL_NUMBERS } from "../../common/wheelNumbers";

import {
    getPlayerNumberCompletionSetCurrent,
} from "../../common/blockchainWrapper";

const CLASS_NAME = "NumbersHitTracker-component";
export function NumbersHitTracker(props) {
    const [currentSet, setCurrentSet] = useState(new Set());

    useEffect(() => {
        setTimeout(async () => {
            const currentNumbers = await getPlayerNumberCompletionSetCurrent(props.playerAddress);
            setCurrentSet(new Set(currentNumbers));
        }, 1000);
    }, [currentSet]);

    return (
        <div
            className={CLASS_NAME}
        >
            {Object.values(WHEEL_NUMBERS).map((wheelNumber, i) => {

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
                        {wheelNumber}
                    </div>
                );
            })}
        </div>
    );
}
