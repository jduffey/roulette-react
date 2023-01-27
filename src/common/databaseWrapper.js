const BASE_URL = 'http://localhost:3001';
const ENDPOINTS = {
    player: '/player',
    spinResults: '/spinResults',
};

async function fetchPlayerBalance() {
    const url = new URL(ENDPOINTS.player, BASE_URL);
    const res = await fetch(url);
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json.balance;
}

async function updatePlayerBalance(balance) {
    const url = new URL(ENDPOINTS.player, BASE_URL);
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance }),
    });
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
    }
}

async function fetchSpinResults() {
    const url = new URL(ENDPOINTS.spinResults, BASE_URL);
    const res = await fetch(url);
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json.results;
}

async function updateSpinResults(results) {
    const url = new URL(ENDPOINTS.spinResults, BASE_URL);
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results }),
    });
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
    }
}

export {
    fetchPlayerBalance,
    updatePlayerBalance,

    fetchSpinResults,
    updateSpinResults,
};
