# Improvement Plan

Below is a prioritized list of improvements for the repository. Each item contains a short description and concrete next-steps.

1. **Random-number security (contracts) — WON'T FIX**
   *Reason:* The application is intended solely for local demos/testing with no real value at stake, so integrating a verifiable RNG (e.g. Chainlink VRF) is out-of-scope.
   *Original suggestion:* `contracts/RandomnessProvider.sol` uses block variables that miners can influence. For production deployments a provably-fair RNG must replace it.

2. **Remove hard-coded addresses & network data — PARTIALLY DONE**
   • ✅ Output deployment artifacts (`scripts/initializeChain.js`) to a JSON file (`contract-addresses.json`) and update `blockchainWrapper.js`
   • ❌ Still needs: Support multiple networks (localhost, testnet, mainnet-fork) via environment variables
   • ❌ Still needs: Frontend should read from JSON file instead of having fallback hardcoded addresses in `blockchainWrapper.js`

3. **Expand smart-contract test coverage — NOT STARTED**
   • ❌ Move Solidity tests to `test/` root (currently in `src/test/contracts/`)
   • ❌ Cover edge-cases: re-entrancy, allowance exhaustion, overflow, unauthorized calls
   • ❌ Add fuzz/invariant tests with Hardhat or Foundry

4. **Stabilize CI pipeline for chain interactions — BASIC IMPLEMENTATION**
   • ✅ Basic CI exists in `.github/workflows/node.js.yml` with Node.js 18.x
   • ❌ Launch Hardhat node in CI with a dedicated step and health-check the JSON-RPC port
   • ❌ Fail the pipeline on linter or coverage regressions
   • ❌ Cache `node_modules` and Hardhat artifacts to speed up builds

5. **Enforce code-style & linting — PARTIALLY DONE**
   • ❌ Introduce Prettier and a stricter ESLint config (airbnb/next)
   • ✅ Remove the spurious `ci` dependency from `package.json`
   • ❌ Run `npm run lint --max-warnings 0` in CI

6. **Introduce type-safety & refactor helpers — PARTIALLY DONE**
   • ❌ Migrate frontend to TypeScript or add JSDoc annotations (no .tsx files found)
   • ✅ Extract and unit-test helpers like `getRandomWheelNumber` and `getCompleteResultsOfRound` (both exist in `src/common/` with tests)

7. **Optimise `Roulette.sol` for gas & clarity — COMPLETED**
   • ✅ Made `_addToSet` `internal`
   • ✅ Use a `constant` wheel array & add NatSpec comments

8. **Adopt standard ERC-20 implementation for token — NOT STARTED**
   • ❌ Inherit from OpenZeppelin `ERC20` and implement deposit/redeem wrappers
   • ❌ Emit `Transfer` events on mint/burn, add rounding checks
   • ❌ No OpenZeppelin dependencies found in `package.json`

9. **Improve documentation & licensing — NOT STARTED**
   • ❌ Add a top-level `LICENSE` (MIT) to align with SPDX headers (README mentions it but file doesn't exist)
   • ❌ Extend README with architecture, deployment flow, and security caveats

10. **Broaden React component & integration tests — NOT STARTED**
    • ❌ Use React-Testing-Library for user-flow tests (placing bets, signing tx)
    • ❌ Add snapshot tests for game components
    • ❌ Track coverage and aim for >80% lines/statements

11. **Gameplay UX fixes — COMPLETED**
   • ✅ Balance validation now accounts for pending bets and uses numeric comparison
   • ✅ Renamed getRandomWheelNumber to fix import typo
   • ✅ Token symbol now fetched asynchronously and re-renders correctly
   • ✅ Multi-bet safeguard alerts user instead of discarding bets

## Summary
- **Completed:** 2 tasks (fully completed)
- **In Progress:** 3 tasks (partially done)
- **Not Started:** 5 tasks
- **Won't Fix:** 1 task