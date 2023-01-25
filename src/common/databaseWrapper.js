const DATABASE_URL = new URL('/player', 'http://localhost:3001');

async function fetchPlayerBalance() {
    const res = await fetch(DATABASE_URL);
    if (!res.ok) {
        console.log("Not OK response from json-server: ", res);
        return `Error: ${res.status} ${res.statusText}`;
    }
    const json = await res.json();
    return json.balance;
}

async function updatePlayerBalance(balance) {
    const res = await fetch(DATABASE_URL, {
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

export { fetchPlayerBalance, updatePlayerBalance };
