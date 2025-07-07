# Combined Roulette Bugs from All Codex Branches

## From 3q8rgg-codex/search-for-bugs-in-roulette-code

# Unresolved Bugs

Below is a list of bugs discovered in the roulette code base along with suggestions for addressing them.

### 1. `formattedChainNumber` treats zero as "Loading..."
```javascript
const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber
        ? parseFloat(chainNumber)
            .toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading...";
}
```
When the numeric value is `0` the falsy check causes "Loading..." to be shown.
*Fix:* only show the loading message when `chainNumber` is `undefined` or `null`.

### 2. Event listeners registered on every render
`MostRecentSpinResults` and `SpinResult` attach listeners outside a proper effect which can leak handlers.
```javascript
rouletteContractEvents.on('ExecutedWager', (playerAddress, wheelNumber) => {
    if (playerAddress === props.playerAddress) {
        const copySpinResults = [...spinResults];
        copySpinResults.push(parseInt(wheelNumber, 10));
        setSpinResults(copySpinResults.slice(-20));
    }
});
```
*Fix:* register the listener inside `useEffect` with a cleanup function so it runs once per component lifecycle.

### 3. Listeners added each spin
`Roulette.handleSpinButtonClick` attaches a new `ExecutedWager` listener every time the wheel spins.
```javascript
executeWager(playerAddress)
    .then((response) => {
        setLatestBlockNumber(response.blockNumber);
    })
    .then(() => {
        rouletteContractEvents.on('ExecutedWager', (playerAddr, wheelNum) => {
            if (playerAddr === props.playerAddress) {
                setWheelNumber(parseInt(wheelNum, 10));
                setWheelIsSpinning(false);
            }
        });
    });
```
*Fix:* install a single event handler with `useEffect` and remove it on cleanup.

### 4. Polling effects recreate timers endlessly
`NumbersHitTracker` and `CompletionsCounter` start a new `setTimeout` every state update.
```javascript
useEffect(() => {
    setTimeout(async () => {
        const currentNumbers = await getPlayerNumberCompletionSetCurrent(props.playerAddress);
        setCurrentSet(new Set(currentNumbers));
    }, 1000);
}, [props.playerAddress, currentSet]);
```
Each state change retriggers the effect leading to accumulating timers.
*Fix:* use `setInterval` with a cleanup function or remove the state variable from the dependency list.

### 5. Directly invoking components
`ChipSelection` invokes the `Chip` function instead of rendering `<Chip />`, so React does not apply keys properly.
```javascript
return Chip({
    id: `chip-${chipAmount}`,
    key: chipAmount,
    auxiliaryClassName: "chip-selection-chip",
    chipAmount,
    onClick: props.onClick,
    isSelected,
});
```
*Fix:* use JSX: `<Chip key={chipAmount} ... />`.

### 6. Duplicate value in game counter outline list
`NumberHitGameCounter` contains a repeated `220`.
```javascript
const outline = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 220, 230, 240, 250, 260, 270, 280, 290, 300].includes(i) ? "1px solid black" : "none";
```
*Fix:* remove the duplicate to keep the intended sequence.

### 7. Hard-coded contract address during approval
`initializeChain.js` approves a fixed roulette contract address.
```javascript
const tx = await tokenContract.approve(
    "0xCE3478A9E0167a6Bc5716DC39DbbbfAc38F27623",
    ethers.utils.parseEther("100000")
);
```
If the contract gets deployed to a different address the approvals go to the wrong target.
*Fix:* read the deployed address from the deployment step or environment variables.

---

## From codex/search-for-bugs-in-roulette-code

# Roulette Code Bugs

Below is a list of issues found in the repository along with a short explanation and suggested fixes. Line numbers correspond to the version in this commit.

## 1. Event listener accumulation in `Roulette.js`
`handleSpinButtonClick` registers a new `ExecutedWager` listener each spin without removing the previous one. Over time this leads to multiple handlers firing for a single event.
```
132: rouletteContractEvents.on('ExecutedWager', (playerAddr, wheelNum) => {
```
**Suggested fix:** move the listener into a `useEffect` with a cleanup function or call `off` before registering a new one.

## 2. `MostRecentSpinResults` registers a listener on every render
The component subscribes to `ExecutedWager` outside of `useEffect`, causing a new callback to be added on each render.
```
11: rouletteContractEvents.on('ExecutedWager', (playerAddress, wheelNumber) => {
```
**Suggested fix:** register the listener once inside `useEffect` and remove it in the cleanup function.

## 3. `SpinResult` listener not cleaned up
`SpinResult` adds an `ExecutedWager` listener inside `useEffect` but never removes it. The dependency array also includes state that triggers repeated re‑attachment.
```
17: rouletteContractEvents.on('ExecutedWager', (playerAddress, wheelNumber) => {
```
**Suggested fix:** use `useEffect` with `[props.playerAddress]` as dependency and return a cleanup function calling `off`.

## 4. `CompletionsCounter` effect depends on state it updates
Including `completionsCount` in the dependency array makes the effect schedule a new timeout whenever the count updates, leading to unnecessary timers.
```
18: useEffect(() => {
...
23: }, [props.playerAddress, completionsCount]);
```
**Suggested fix:** remove `completionsCount` from the dependency array or use an interval.

## 5. `NumbersHitTracker` effect depends on its own state
Similar to the issue above, the effect fetches data and updates `currentSet`, but `currentSet` is listed as a dependency so the effect re-runs after each update.
```
11: useEffect(() => {
...
16: }, [props.playerAddress, currentSet]);
```
**Suggested fix:** depend only on `props.playerAddress` and clear the timeout in a cleanup function.

The repository also contains a historical `KNOWN_BUGS.md` file describing previously fixed issues. Review that document for more context.

---

## From svez6u-codex/search-for-bugs-in-roulette-code

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

---

## From wqmvmz-codex/search-for-bugs-in-roulette-code

# Roulette Bugs

Below is a list of issues discovered in the current codebase along with suggested fixes.

## 1. Repeated event listeners in `SpinResult`
`SpinResult.js` registers a listener to the `ExecutedWager` event inside a `useEffect` whose dependency array includes state values. Each render attaches a new listener without removal, leading to duplicate callbacks.

**Suggestion:** Wrap the subscription in a `useEffect` with an empty dependency array and return a cleanup function that removes the listener.

## 2. Event listener outside `useEffect` in `MostRecentSpinResults`
`MostRecentSpinResults.js` calls `rouletteContractEvents.on` directly inside the component body, meaning a new listener is added on every render.

**Suggestion:** Move the registration into `useEffect` with a cleanup to remove the listener on unmount.

## 3. Inefficient `useEffect` dependencies causing loops
`NumbersHitTracker.js` and `CompletionsCounter.js` both include their own state variables in the `useEffect` dependency arrays while updating those same states. This schedules a new fetch every time the data updates, causing unnecessary loops.

**Suggestion:** Remove the state variables from the dependency arrays and only depend on the player address.

## 4. Stale state in `SpinButton`
`SpinButton.js` sets `shouldDisplayExtraMessage` inside a `useEffect` that also uses the value to set `zIndex` and `color`. Because the previous state is used, the rendered values may be one step behind.

**Suggestion:** Compute a local variable for the desired flag and use it for all state updates inside the effect.

## 5. Incorrect `<br />` tags
`HouseInfo.js` and `PlayerInfo.js` contain `< br />` with a leading space, producing invalid JSX.

**Suggestion:** Replace `< br />` with `<br />`.

## 6. Duplicate value in `NumberHitGameCounter`
`NumberHitGameCounter.js` has `220` listed twice in the outline breakpoints array which appears to be accidental.

**Suggestion:** Remove the duplicate entry so the array progresses as intended.

