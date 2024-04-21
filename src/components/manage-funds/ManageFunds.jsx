import { useState } from "react";

export function ManageFunds() {
    const [ethBalances, setEthBalances] = useState([]);
    console.log(ethBalances);

    return (
        <div
            style={{
                width: 1440,
                height: 1024,
                outline: '1px solid red',
            }}
        >
            MANAGE FUNDS
        </div>
    );
}