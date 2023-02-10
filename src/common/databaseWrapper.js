const BASE_URL = 'http://localhost:3001';
const ENDPOINT = '/player';
const DB_URL = new URL(ENDPOINT, BASE_URL);

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

async function fetchNewTransactionHistory() {
    const BASE_URL = 'http://localhost:3001';
    const ENDPOINT = '/newTransactions';
    const res = await fetch(new URL(ENDPOINT, BASE_URL));
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json;
}

async function updateNewTransactionHistory(transactions) {
    const BASE_URL = 'http://localhost:3001';
    const ENDPOINT = '/newTransactions';
    const res = await fetch(new URL(ENDPOINT, BASE_URL), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions }),
    });
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
    }
}

export {
    fetchTransactionHistory,
    updateTransactionHistory,
    resetTransactionHistory,
    fetchNewTransactionHistory,
    updateNewTransactionHistory,
};
