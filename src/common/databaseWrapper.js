const BASE_URL = 'http://localhost:3001';
const ROULETTE = '/roulette';
const DB_URL = new URL(ROULETTE, BASE_URL);

async function fetchTransactionHistory() {
    const res = await fetch(DB_URL);
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json;
}

async function updateTransactionHistory(history) {
    const res = await fetch(DB_URL, {
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

async function resetTransactionHistory() {
    const res = await fetch(DB_URL, {
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
