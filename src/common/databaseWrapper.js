const BASE_URL = 'http://localhost:3001';
const PATH_ROULETTE = '/roulette';
// const PATH_SIC_BO = '/sic-bo';
const dbUrl = (path) => new URL(path, BASE_URL);

async function fetchTransactionHistory(path) {
    const res = await fetch(dbUrl(path));
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json;
}

async function updateTransactionHistory(path, history) {
    const res = await fetch(dbUrl(path), {
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

async function resetTransactionHistory(path) {
    const res = await fetch(dbUrl(path), {
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
    PATH_ROULETTE,
};
