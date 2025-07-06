# Additional Bugs Identified

The following issues have been discovered in the repository in addition to those already documented in `KNOWN_BUGS.md`.

## 1. Event listener leaks
Multiple components attach listeners to the `ExecutedWager` event every render or spin without removing them. Over time this can lead to duplicate handlers and memory leaks.

- **Roulette.js** registers a listener each time a spin occurs:
```
rouletteContractEvents.on('ExecutedWager', (playerAddr, wheelNum) => {
    if (playerAddr === props.playerAddress) {
        setWheelNumber(parseInt(wheelNum, 10));
        setWheelIsSpinning(false);
    }
});
```
【F:src/components/roulette/Roulette.js†L128-L138】
- **SpinResult.js** attaches a listener inside a `useEffect` that reruns whenever state updates:
```
rouletteContractEvents.on('ExecutedWager', (playerAddress, wheelNumber) => {
    if (playerAddress === props.playerAddress) {
        setBgColor(getWheelNumberColor(parseInt(wheelNumber, 10)));
        setMostRecentSpinResultText(parseInt(wheelNumber, 10) === 37 ? "00" : parseInt(wheelNumber, 10));
    }
});
```
【F:src/components/roulette/SpinResult.js†L17-L21】
- **MostRecentSpinResults.js** adds a listener outside any `useEffect`, causing one to be created on every render:
```
rouletteContractEvents.on('ExecutedWager', (playerAddress, wheelNumber) => {
    if (playerAddress === props.playerAddress) {
        const copySpinResults = [...spinResults];
        copySpinResults.push(parseInt(wheelNumber, 10));
        setSpinResults(copySpinResults.slice(-20));
    }
});
```
【F:src/components/roulette/MostRecentSpinResults.js†L11-L16】

**Suggested fix:** Register event listeners in `useEffect` with an empty dependency array and clean them up in the return function using `.off`.

## 2. Infinite update loops in hooks
`NumbersHitTracker` and `CompletionsCounter` include state they modify in their `useEffect` dependency arrays. Each update triggers another effect, causing continuous polling.

- **NumbersHitTracker.js**:
```
useEffect(() => {
    setTimeout(async () => {
        const currentNumbers = await getPlayerNumberCompletionSetCurrent(props.playerAddress);
        setCurrentSet(new Set(currentNumbers));
    }, 1000);
}, [props.playerAddress, currentSet]);
```
【F:src/components/roulette/NumbersHitTracker.js†L11-L16】

- **CompletionsCounter.js**:
```
useEffect(() => {
    setTimeout(async () => {
        const count = await getPlayerNumberCompletionSetsCounter(props.playerAddress);
        setCompletionsCount(count);
    }, 1000);
}, [props.playerAddress, completionsCount]);
```
【F:src/components/roulette/CompletionsCounter.js†L18-L23】

**Suggested fix:** Remove the state variables from the dependency arrays or switch to `setInterval` with proper cleanup so the effect runs predictably.

## 3. Uncontrolled intervals in simulation script
`simulatePlayingGame.js` nests `setInterval` calls without clearing them, creating runaway timers:
```
setInterval(() => {
    let betsPlaced = 0;
    setInterval(() => {
        if (betsPlaced++ >= NUMBER_OF_BETS_TO_PLACE) return;
        ...
    }, SECONDS_BETWEEN_BET_PLACEMENTS * 1000);
    const spinButtonElement = document.getElementById("spin-button");
    spinButtonElement.click();
}, (NUMBER_OF_BETS_TO_PLACE + 1) * SECONDS_BETWEEN_BET_PLACEMENTS * 1000);
```
【F:src/common/simulatePlayingGame.js†L14-L39】

**Suggested fix:** Use a single interval or clear the inner interval after betting. Alternatively, drive the demo with explicit timeouts.

## 4. Typo in `HouseInfo` component
The line break in `HouseInfo.js` contains a space (`< br />`) which prevents proper rendering:
```
House Balance
< br />
{formattedChainNumber(houseBalance, 3)}
```
【F:src/components/roulette/HouseInfo.js†L33-L39】

**Suggested fix:** Replace with `<br />`.

---
These issues are not recorded in `KNOWN_BUGS.md` and may still affect runtime behavior. Addressing them will improve the application's reliability.
