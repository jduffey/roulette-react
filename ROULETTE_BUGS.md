# Current Roulette Bugs

This document lists all currently unresolved bugs in the roulette codebase as of the latest review.

## Critical Bugs

### 1. Infinite Update Loops in `CompletionsCounter`
**File**: `src/components/roulette/CompletionsCounter.js` (lines 18-23)

**Issue**: The `useEffect` includes `completionsCount` in its dependency array while also updating that same state, causing infinite re-renders and unnecessary API calls.

```javascript
useEffect(() => {
    setTimeout(async () => {
        const count = await getPlayerNumberCompletionSetsCounter(props.playerAddress);
        setCompletionsCount(count);
    }, 1000);
}, [props.playerAddress, completionsCount]); // ❌ completionsCount causes infinite loop
```

**Fix**: Remove `completionsCount` from the dependency array:
```javascript
}, [props.playerAddress]); // ✅ Only depend on player address
```

### 2. Uncontrolled Intervals in Simulation Script
**File**: `src/common/simulatePlayingGame.js` (lines 14-39)

**Issue**: Nested `setInterval` calls without clearing them, creating runaway timers that accumulate over time.

```javascript
setInterval(() => {
    let betsPlaced = 0;
    setInterval(() => { // ❌ Inner interval never cleared
        if (betsPlaced++ >= NUMBER_OF_BETS_TO_PLACE) return;
        // ... betting logic
    }, SECONDS_BETWEEN_BET_PLACEMENTS * 1000);
    // ... spin logic
}, (NUMBER_OF_BETS_TO_PLACE + 1) * SECONDS_BETWEEN_BET_PLACEMENTS * 1000);
```

**Fix**: Use a single interval or clear the inner interval after completion.

## Functional Bugs

### 3. `formattedChainNumber` Treats Zero as "Loading..."
**Files**: 
- `src/components/roulette/PlayerInfo.js` (lines 1-6)
- `src/components/roulette/HouseInfo.js` (lines 6-11)
- `src/components/roulette/CompletionsCounter.js` (lines 6-11)

**Issue**: The falsy check `chainNumber ? ... : "Loading..."` treats `0` as falsy, causing legitimate zero values to display as "Loading...".

```javascript
const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber
        ? parseFloat(chainNumber)
            .toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading..."; // ❌ 0 is falsy, so shows "Loading..."
}
```

**Fix**: Check for `null` or `undefined` explicitly:
```javascript
return chainNumber !== null && chainNumber !== undefined
    ? parseFloat(chainNumber)
        .toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : "Loading...";
```

### 4. Stale State in `SpinButton`
**File**: `src/components/roulette/SpinButton.js` (lines 10-18)

**Issue**: The `useEffect` uses `shouldDisplayExtraMessage` in its dependency array while also setting it, potentially causing stale state issues.

```javascript
useEffect(() => {
    setShouldDisplayExtraMessage(!props.hasABetBeenPlaced || props.wheelIsSpinning);
    setZIndex(shouldDisplayExtraMessage ? 1 : -1); // ❌ Uses stale state
    setColor(shouldDisplayExtraMessage ? '#999999' : 'inherit'); // ❌ Uses stale state
    // ...
}, [shouldDisplayExtraMessage, props.hasABetBeenPlaced, props.wheelIsSpinning]);
```

**Fix**: Compute the flag locally and use it consistently:
```javascript
useEffect(() => {
    const shouldDisplay = !props.hasABetBeenPlaced || props.wheelIsSpinning;
    setShouldDisplayExtraMessage(shouldDisplay);
    setZIndex(shouldDisplay ? 1 : -1);
    setColor(shouldDisplay ? '#999999' : 'inherit');
    // ...
}, [props.hasABetBeenPlaced, props.wheelIsSpinning]);
```

## UI/Display Bugs

### 5. Invalid JSX Tags with Leading Spaces
**Files**:
- `src/components/roulette/HouseInfo.js` (line 39)
- `src/components/roulette/PlayerInfo.js` (lines 15, 20, 25)

**Issue**: Contains `< br />` with leading space instead of `<br />`, producing invalid JSX.

```javascript
House Balance
< br /> {/* ❌ Invalid JSX */}
{formattedChainNumber(houseBalance, 3)}
```

**Fix**: Replace with proper JSX:
```javascript
House Balance
<br /> {/* ✅ Correct JSX */}
{formattedChainNumber(houseBalance, 3)}
```

### 6. Duplicate Value in Game Counter Outline
**File**: `src/components/roulette/NumberHitGameCounter.js` (line 12)

**Issue**: The outline breakpoints array contains a duplicate `220` value, which appears to be accidental.

```javascript
const outline = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 220, 230, 240, 250, 260, 270, 280, 290, 300].includes(i) ? "1px solid black" : "none";
//                                                                                    ^^^ ❌ Duplicate
```

**Fix**: Remove the duplicate `220`:
```javascript
const outline = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300].includes(i) ? "1px solid black" : "none";
```

## Previously Fixed Bugs

The following bugs have been resolved in recent updates:

✅ **Event listener leaks in `MostRecentSpinResults` and `SpinResult`** - Fixed with proper `useEffect` cleanup
✅ **Event listener accumulation in `Roulette.js`** - Fixed with proper listener removal
✅ **Infinite update loops in `NumbersHitTracker`** - Fixed by switching to event-driven updates
✅ **Hard-coded contract address in `initializeChain.js`** - Fixed to use dynamic contract addresses

## Recommendations

1. **Priority 1**: Fix the infinite loop in `CompletionsCounter` as it causes performance issues
2. **Priority 2**: Fix the `formattedChainNumber` zero bug as it affects user experience
3. **Priority 3**: Fix the JSX formatting issues for cleaner code
4. **Priority 4**: Address the simulation script intervals for better resource management
5. **Priority 5**: Fix the stale state issue in `SpinButton` for more predictable behavior
6. **Priority 6**: Remove the duplicate value in the game counter for cleaner code
