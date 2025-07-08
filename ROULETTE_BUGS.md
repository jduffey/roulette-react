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
