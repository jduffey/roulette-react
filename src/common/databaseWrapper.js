async function fetchCoinbaseBtcPrice() {
    const res = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    if (!res.ok) {
        console.log("Not OK response from Coinbase server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    // console.log("OK response from Coinbase: ", res);
    const json = await res.json();
    return json.data.amount;
}

async function fetchPlayerBalance() {
    const res = await fetch('http://localhost:3001/player/');
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    // console.log("OK response from json-server: ", res);
    const json = await res.json();
    return json.balance;
}

export { fetchCoinbaseBtcPrice, fetchPlayerBalance };
