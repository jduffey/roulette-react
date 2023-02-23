[![Node.js CI](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml)
[![DeepSource](https://deepsource.io/gh/jduffey/roulette-react.svg/?label=active+issues&show_trend=true&token=oBR3ln1gv1ugsjCE4f7yBgvH)](https://deepsource.io/gh/jduffey/roulette-react/)

# NOTICE 👷‍♀️
Some tests are disabled as a workaround to prevent failures in the CI/CD pipeline caused by the websocket provider being unable to make a connection when tests are run.

# Instructions

1. `npm install`
   - installs dependencies, including json-server
1. `npm test`
   - runs tests using the Jest testing framework included with `create-react-app`
1. `npm start`
   - starts json-server then runs `react-scripts start` 

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [json-server](https://github.com/typicode/json-server). Development is underway to replace json-server with a local Ethereum node run by [Hardhat](https://hardhat.org/).

## Setting up Player Token Balances

`npx hardhat node`
- starts the Hardhat node

~~`npx hardhat compile`~~ (not necessary because the deploy script compiles for us)
- ~~compiles the contract(s)~~

`npx hardhat run scripts/deployTokenContract.js --network localhost`
- deploys the token contract to the Hardhat chain running locally

`npx hardhat run scripts/depositEthForTokens.js --network localhost`
- deposits 1.0 ETH in exchange for 100,000 GAME tokens on behalf of the generated accounts (10.0 ETH for the last "house" account)