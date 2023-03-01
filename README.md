[![Node.js CI](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml)
[![DeepSource](https://deepsource.io/gh/jduffey/roulette-react.svg/?label=active+issues&show_trend=true&token=oBR3ln1gv1ugsjCE4f7yBgvH)](https://deepsource.io/gh/jduffey/roulette-react/)

# NOTICE 👷‍♀️
Some tests are disabled as a workaround to prevent failures in the CI/CD pipeline caused by the websocket provider being unable to make a connection when tests are run.

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
    - deploys the games played contract
    - mints tokens for the generated accounts
    - runs `npx hardhat run scripts/initializeChain.js --network localhost`
1. `npm start`
    - starts json-server then the React app
    - runs `json-server --watch -p 3001 db.json & react-scripts start`

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [json-server](https://github.com/typicode/json-server). Development is underway to replace json-server with a local Ethereum node run by [Hardhat](https://hardhat.org/).