import { useEffect, useState } from 'react';

import {
    getPlayerNumberCompletionSetsCounter,
} from "../../common/blockchainWrapper";

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
            {completionsCount}
        </div >
    )
}
