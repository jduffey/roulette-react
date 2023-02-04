import React from 'react';

import { WHEEL_NUMBERS } from '../../common/wheelNumbers';

const CLASS_NAME = "CompletionsCounter-component";
export function CompletionsCounter(props) {
    const txHistory = props.transactionHistory;

    const counterOfHitSpinResults = Object.values(WHEEL_NUMBERS).reduce((acc, wheelNumber) => {
        acc[wheelNumber] = 0;
        return acc;
    }, {});

    txHistory.forEach((tx) => {
        counterOfHitSpinResults[tx.spinResult] += 1;
    });
    // TODO this is a hacky way to get the total number of times that all numbers have been hit
    // e.g. if the min value is 7 then all other numbers have been hit at least 7 times
    const completionsCount = Math.min(...Object.values(counterOfHitSpinResults));

    return (
        <div
            className={CLASS_NAME}
        >
            {completionsCount}
        </div >
    )
}
