const BASE_URL = 'http://localhost:3001';
// const ENDPOINT = '/player';
// const DB_URL = new URL(ENDPOINT, BASE_URL);

async function fetchTransactionHistory(playerId) {
    // console.log("Fetching transaction history from: ", DB_URL);
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
    // console.log("Updating transaction history to: ", DB_URL);
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

async function resetTransactionHistory(playerId) {
    // console.log("Resetting transaction history to: ", DB_URL);
    const dbUrl = new URL(playerId, BASE_URL);
    const res = await fetch(dbUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history: [] }),
    });
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
    }
}

export {
    fetchTransactionHistory,
    updateTransactionHistory,
    resetTransactionHistory,
};
