import React, { useEffect } from 'react';
import { useState } from 'react';


async function fetchCoinbaseBtcPrice() {
    const res = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    return await res.json();
}

async function fetchJsonServer() {
    const res = await fetch('http://localhost:3000/players/1');
    return await res.json();
}

export const PlayerInfoAsync = () => {
    const [btcPrice, setBtcPrice] = useState("Loading...");
    const [jsonServerValue, setJsonServerValue] = useState("Loading...");

    useEffect(() => {
        let mounted = true;

        fetchCoinbaseBtcPrice()
            .then(json => {
                if (mounted) {
                    setBtcPrice(json.data.amount);
                }
            });

        fetchJsonServer()
            .then(json => {
                if (mounted) {
                    setJsonServerValue(json.name);
                }
            });

        return () => mounted = false;
    }, []);

    return (
        <div className="player-info" >
            {"Coinbase BTC"}
            < br />
            {btcPrice}
            <br />
            <br />
            {"JSON Server"}
            <br />
            {jsonServerValue}
        </div >
    )
}
