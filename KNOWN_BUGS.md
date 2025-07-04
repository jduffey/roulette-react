# Known Bugs

Below is an (incomplete) catalogue of **current, confirmed defects** in the repository.  Each entry contains
• a short description
• why it is a problem
• a code citation so it can be located quickly.

---

### 1.  `_addToSet` is **public** – anyone can tamper with player stats **(FIXED)**
```18:26:contracts/Roulette.sol
function _addToSet(address addr, uint256 wheelNumber) public {
```
*Should be* `internal` (or at least `external onlyOwner`) because any caller can currently fake wheel-hits, reset a player's set and increment `completionCounter` for free.

---

### 2.  Insecure RNG on–chain **(WON'T FIX - DEMO ONLY)**
```5:9:contracts/RandomnessProvider.sol
uint256 randVal = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.difficulty)));
```
`blockhash`/`difficulty` are miner-controllable and totally predictable for contracts that pay out value.  A verifiable source such as Chainlink VRF is required for fairness.

**Note:** This is intentionally left as-is because the project is for local demo/testing only with no real value at stake. See detailed comment in `RandomnessProvider.sol` for rationale.

---

### 3.  Wheel number **mismatch (off-by-one)** between Solidity and React **(FIXED)**
Solidity generates `rand % 38` → values **0-37** where `37` represents «00».  The front-end enum however stopped at `WN_36`, so value `37` broke helpers.  Added handling for `37` in `getWinningCriteria` and tests (see commit fixing-#3-wheel-mismatch).

---

### 4.  `provider.getBlock()` called **without a block tag** **(FIXED)**
`blockchainWrapper.getBlock()` now explicitly requests `provider.getBlock("latest")`, preventing errors on strict providers.

---

### 5.  `tokenSymbol` exported as a **mutable variable** – React never re-renders **(FIXED)**
```64:85:src/common/blockchainWrapper.js
let tokenSymbol;
...
)).symbol().then((symbol) => { tokenSymbol = symbol; });
```
Resolved by replacing with `getTokenSymbol()` async getter and state-driven symbol in Balances component.

---

### 6.  Balance check uses **string vs number** & ignores pending bets **(FIXED)**
```66:72:src/components/roulette/Roulette.js
if (currentChipAmountSelected > playerBalance) {
```
`playerBalance` comes from `ethers.utils.formatEther` → **string**.  JS coerces but treats "0.1" > 1 as `false`.  It also ignores chips already wagered, allowing the user to bet more than they own.

---

### 7.  Multiple-bet safeguard just **drops all bets** **(FIXED)**
```96:103:src/components/roulette/Roulette.js
alert("Only one bet per spin is supported right now. Please remove extra bets or wait for multi-bet support.");
```
Now shows alert and preserves existing bets instead of silently clearing them.

---

### 8.  Typo: `DEPRECTAED_getRandomWheelNumber` **(FIXED)**
```7:7:src/components/roulette/Roulette.js
import { getRandomWheelNumber } from '../../common/getRandomWheelNumber';
```
Renamed export and imports, added alias for backward compatibility.

---

### 9.  Loss-of-funds rounding in `MyGameToken.redeem()` **(FIXED)**
```39:46:contracts/MyGameToken.sol
uint256 etherOwed = tokensToRedeem / _tokensPerEth;
```
Added divisibility check (`require(tokensToRedeem % _tokensPerEth == 0)`) to prevent fractional redemption and loss-of-funds.

---

### 10.  `RandomnessProvider` (frontend) accepts digests of any length **(FIXED)**
Validation added in constructor to throw if digest is not a 64-character hex string.

---

### 11.  Hard-coded addresses & contract IDs **(FIXED)**
Addresses now read from `process.env.REACT_APP_*` variables with sensible fall-backs, allowing multi-network deployments.

---

### 12.  Locale-sensitive snapshot tests **(FIXED)**
`PlayerInfo` now formats numbers with the `en-US` locale, making snapshots deterministic across environments.

---

### 13.  Concurrent execution in Solidity tests caused **race conditions** **(FIXED)**
```220:340:src/test/contracts/Roulette.js
// Promise.all() replaced with sequential for-loops to ensure proper state updates
```
Submitting multiple transactions in parallel led to inconsistent contract state and failing tests. Rewrote the test logic to run wagers sequentially, eliminating race conditions. See commit d404cc5.

---

*(End of file – please update as additional bugs are discovered)*