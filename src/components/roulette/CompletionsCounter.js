import React from 'react';

import { getCompletedSets } from '../../common/getCompletedSets';

const CLASS_NAME = "CompletionsCounter-component";
export function CompletionsCounter(props) {
    const completionsCount = getCompletedSets(props.transactionHistory);

    return (
        <div
            className={CLASS_NAME}
        >
            {completionsCount}
        </div >
    )
}
