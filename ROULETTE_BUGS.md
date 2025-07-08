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

