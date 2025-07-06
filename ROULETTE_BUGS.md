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
