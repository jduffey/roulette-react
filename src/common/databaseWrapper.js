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
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: balance }),
    });
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
    }
}

async function fetchBetsPlaced() {
    const url = new URL(ENDPOINTS.player, BASE_URL);
    const res = await fetch(url);
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json.betsPlaced;
}

async function updateBetsPlaced(bets) {
    const url = new URL(ENDPOINTS.player, BASE_URL);
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ betsPlaced: bets }),
    });
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
    }
}

async function fetchPreviousRoundStartingBalance() {
    const url = new URL(ENDPOINTS.player, BASE_URL);
    const res = await fetch(url);
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json.previousRoundStartingBalance;
}

async function updatePreviousRoundStartingBalance(balance) {
    const url = new URL(ENDPOINTS.player, BASE_URL);
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ previousRoundStartingBalance: balance }),
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

    updateBetsPlaced,
    fetchBetsPlaced,

    fetchPreviousRoundStartingBalance,
    updatePreviousRoundStartingBalance,

    fetchSpinResults,
    updateSpinResults,
};
