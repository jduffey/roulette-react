const BASE_URL = 'http://localhost:3001';

async function fetchTransactionHistory(playerId) {
    const dbUrl = new URL(playerId, BASE_URL);
    const res = await fetch(dbUrl);
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json;
}

async function updateTransactionHistory(history, playerId) {
    const dbUrl = new URL(playerId, BASE_URL);
    const res = await fetch(dbUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history }),
    });
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
    }
}

export {
    fetchTransactionHistory,
    updateTransactionHistory,
};
