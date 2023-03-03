import { useEffect, useState } from 'react';

import {
    getPlayerNumberCompletionSetsCounter,
} from "../../common/blockchainWrapper";

const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber
        ? parseFloat(chainNumber)
            .toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading...";
}

const CLASS_NAME = "CompletionsCounter-component";
export function CompletionsCounter(props) {
    const [completionsCount, setCompletionsCount] = useState(undefined);

    useEffect(() => {
        setTimeout(async () => {
            const count = await getPlayerNumberCompletionSetsCounter(props.playerAddress);
            setCompletionsCount(count);
        }, 1000);
    }, [completionsCount]);

    return (
        <div
            className={CLASS_NAME}
        >
            {formattedChainNumber(completionsCount, 0)}
        </div >
    )
}
