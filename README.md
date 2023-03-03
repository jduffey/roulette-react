[![Node.js CI](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml)
[![DeepSource](https://deepsource.io/gh/jduffey/roulette-react.svg/?label=active+issues&show_trend=true&token=oBR3ln1gv1ugsjCE4f7yBgvH)](https://deepsource.io/gh/jduffey/roulette-react/)

# Instructions

1. `npm install`
   - installs dependencies
1. `npm test`
   - runs tests using the Jest testing framework included with `create-react-app`
1. `npm run start-chain`
    - starts the Hardhat node
    - runs `npx hardhat node`
1. `npm run init-chain`
    - deploys the token contract
    - deploys the roulette contract
    - mints tokens for the generated accounts
    - runs `npx hardhat run scripts/initializeChain.js --network localhost`
1. `npm start`
    - starts the React app
    - runs `react-scripts start`

## Notes

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses a local Hardhat Ethereum node [Hardhat](https://hardhat.org/).