# Improvement Plan

Below is a prioritized list of improvements for the repository. Each item contains a short description and concrete next-steps.

1. **Random-number security (contracts) — WON'T FIX**
   *Reason:* The application is intended solely for local demos/testing with no real value at stake, so integrating a verifiable RNG (e.g. Chainlink VRF) is out-of-scope.
   *Original suggestion:* `contracts/RandomnessProvider.sol` uses block variables that miners can influence. For production deployments a provably-fair RNG must replace it.

2. **Remove hard-coded addresses & network data**
   • Output deployment artifacts (`scripts/initializeChain.js`) to a JSON file or `.env` and have the frontend read them.
   • Support multiple networks (localhost, testnet, mainnet-fork) via environment variables.

3. **Expand smart-contract test coverage**
   • Move Solidity tests to `test/` root.
   • Cover edge-cases: re-entrancy, allowance exhaustion, overflow, unauthorized calls.
   • Add fuzz/invariant tests with Hardhat or Foundry.

4. **Stabilize CI pipeline for chain interactions**
   • Launch Hardhat node in CI with a dedicated step and health-check the JSON-RPC port.
   • Fail the pipeline on linter or coverage regressions.
   • Cache `node_modules` and Hardhat artifacts to speed up builds.

5. **Enforce code-style & linting**
   • Introduce Prettier and a stricter ESLint config (airbnb/next).
   • Remove the spurious `ci` dependency from `package.json`.
   • Run `npm run lint --max-warnings 0` in CI.

6. **Introduce type-safety & refactor helpers**
   • Migrate frontend to TypeScript or add JSDoc annotations.
   • Extract and unit-test helpers like `getRandomWheelNumber` and `getCompleteResultsOfRound`.

7. **Optimise `Roulette.sol` for gas & clarity — PARTIALLY DONE**
   • ✅ Made `_addToSet` `internal`.
   • Still pending: use a `constant` wheel array & add NatSpec comments.

8. **Adopt standard ERC-20 implementation for token**
   • Inherit from OpenZeppelin `ERC20` and implement deposit/redeem wrappers.
   • Emit `Transfer` events on mint/burn, add rounding checks.

9. **Improve documentation & licensing**
   • Add a top-level `LICENSE` (MIT) to align with SPDX headers.
   • Extend README with architecture, deployment flow, and security caveats.

10. **Broaden React component & integration tests**
    • Use React-Testing-Library for user-flow tests (placing bets, signing tx).
    • Add snapshot tests for game components.
    • Track coverage and aim for >80% lines/statements.