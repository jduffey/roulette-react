[![Node.js CI](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml)

# Instructions

1. `npm install`
   - installs dependencies, including json-server
1. `npm test`
   - runs tests using the Jest testing framework included with `create-react-app`
1. `npm start`
   - starts json-server then runs `react-scripts start` 

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [json-server](https://github.com/typicode/json-server).

## Hardhat Spike

`npx hardhat node`
- starts the Hardhat node

`npx hardhat compile`
- compiles the contract(s)

`npx hardhat run scripts/deploy.js --network localhost`
- runs the deploy script which deploys the contracts to the Hardhat chain running locally