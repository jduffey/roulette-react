# Known Bugs

Below is an (incomplete) catalogue of **current, confirmed defects** in the repository.  Each entry contains
• a short description
• why it is a problem
• a code citation so it can be located quickly.

---

### 1.  `_addToSet` is **public** – anyone can tamper with player stats
```18:26:contracts/Roulette.sol
function _addToSet(address addr, uint256 wheelNumber) public {
```
*Should be* `internal` (or at least `external onlyOwner`) because any caller can currently fake wheel-hits, reset a player's set and increment `completionCounter` for free.

---

### 2.  Insecure RNG on–chain
```5:9:contracts/RandomnessProvider.sol
uint256 randVal = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.difficulty)));
```
`blockhash`/`difficulty` are miner-controllable and totally predictable for contracts that pay out value.  A verifiable source such as Chainlink VRF is required for fairness.

---

### 3.  Wheel number **mismatch (off-by-one)** between Solidity and React
Solidity generates `rand % 38` → values **0-37** where `37` represents «00».  The front-end enum however stops at `WN_36` and stores «00» as string "00", so a value of `37` coming from the contract has **no mapping** on the UI (and many helpers throw).
```1:41:src/common/wheelNumbers.js
WN_36: "36",
```
No `WN_37` entry.

---

### 4.  `provider.getBlock()` called **without a block tag**
```25:33:src/common/blockchainWrapper.js
const block = await provider.getBlock();
```
Ethers v5 expects a block number/hash.  Passing `undefined` throws in many providers.  Intended call is probably `getBlockNumber()` *or* `getBlock("latest")`.

---

### 5.  `tokenSymbol` exported as a **mutable variable** – React never re-renders
```64:85:src/common/blockchainWrapper.js
let tokenSymbol;
...
)).symbol().then((symbol) => { tokenSymbol = symbol; });
```
`Balances` reads it once at import-time; the async assignment happens later so the table header prints "undefined Balance".  Needs `useState`/context instead.

---

### 6.  Balance check uses **string vs number** & ignores pending bets
```66:72:src/components/roulette/Roulette.js
if (currentChipAmountSelected > playerBalance) {
```
`playerBalance` comes from `ethers.utils.formatEther` → **string**.  JS coerces but treats "0.1" > 1 as `false`.  It also ignores chips already wagered, allowing the user to bet more than they own.

---

### 7.  Multiple-bet safeguard just **drops all bets**
```96:103:src/components/roulette/Roulette.js
if (pendingBets.length > 1) {
    console.log("UNDER DEV: You can only place one bet per spin until contract can handle multiple bets.");
    setPendingBets([]);              // ← silently discards wagers
    return;
}
```
User loses their selected bets without notice; should either block extra bet UI-side or support batching.

---

### 8.  Typo: `DEPRECTAED_getRandomWheelNumber`
```7:7:src/components/roulette/Roulette.js
import { DEPRECTAED_getRandomWheelNumber } from '../../common/getRandomWheelNumber';
```
Spelling error propagates through code & tests.

---

### 9.  Loss-of-funds rounding in `MyGameToken.redeem()`
```39:46:contracts/MyGameToken.sol
uint256 etherOwed = tokensToRedeem / _tokensPerEth;
```
Integer division truncates – redeeming amounts **not perfectly divisible by 100 000** burns tokens with no ETH returned.

---

### 10.  `RandomnessProvider` (frontend) accepts digests of any length
`getRandomElement()` never validates the supplied 64-char hex digest, so shorter strings silently skew randomness.

---

### 11.  Hard-coded addresses & contract IDs
```6:15:src/common/blockchainWrapper.js
const FIRST_PLAYER_ADDRESS = "0xf39Fd…";
```
Breaks on any chain/network other than the developer's local Hardhat instance.

---

### 12.  Locale-sensitive snapshot tests
```7:9:src/test/components/roulette/PlayerInfo.test.js
[123456.354215, 56789] // TODO this test will fail if run in an environment with a different locale
```
Tests fail on systems that use commas for decimal separators.

---

*(End of file – please update as additional bugs are discovered)*