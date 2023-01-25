import { useEffect, useState } from 'react';
import { fetchCoinbaseBtcPrice, fetchPlayerBalance } from '../common/databaseWrapper';

export const PlayerInfoAsync = () => {
    const [btcPrice, setBtcPrice] = useState("Loading...");
    const [playerBalance, setPlayerBalance] = useState("Loading...");

    useEffect(() => {
        let mounted = true;

        fetchCoinbaseBtcPrice()
            .then(json => {
                // console.log(`${fetchCoinbaseBtcPrice.name} -> ${json}`);
                if (mounted) {
                    setBtcPrice(json);
                }
            });

        fetchPlayerBalance()
            .then(json => {
                // console.log(`${fetchPlayerBalance.name} -> ${json}`);
                if (mounted) {
                    setPlayerBalance(json);
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
            {playerBalance}
        </div >
    )
}
