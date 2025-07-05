[![Node.js CI](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/jduffey/roulette-react/actions/workflows/node.js.yml)
[![DeepSource](https://deepsource.io/gh/jduffey/roulette-react.svg/?label=active+issues&show_trend=true&token=oBR3ln1gv1ugsjCE4f7yBgvH)](https://deepsource.io/gh/jduffey/roulette-react/)

# Roulette React App

A decentralized roulette game built with React and Solidity, featuring real-time balance updates and blockchain-based betting.

## Features

- **Real-time Balance Updates**: Player and house balances update automatically after transactions
- **Blockchain-based Betting**: All bets are placed and executed on the blockchain
- **Token-based Economy**: Uses a custom ERC-20 token (GAME) for betting
- **Multiple Bet Types**: Supports straight-up bets with 35:1 payouts
- **Completion Tracking**: Tracks player progress through all wheel numbers

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or similar Web3 wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roulette-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local blockchain**
   ```bash
   npx hardhat node
   ```

4. **Initialize the blockchain** (in a new terminal)
   ```bash
   npx hardhat run scripts/initializeChain.js --network localhost
   ```

5. **Start the React application**
   ```bash
   npm start
   ```

6. **Connect MetaMask**
   - Network: Localhost 8545
   - Chain ID: 1337
   - Import one of the test accounts provided by Hardhat

## How It Works

### Contract Architecture

- **MyGameToken.sol**: ERC-20 token with 1:100,000 ETH ratio
- **RandomnessProvider.sol**: Provides random numbers (demo only - not secure for production)
- **Roulette.sol**: Main game contract handling bets and payouts

### Balance Update System

The application now features a robust balance update system:

1. **Real-time Updates**: Balances refresh automatically when new blocks are mined
2. **Transaction Confirmation**: UI waits for transaction confirmation before updating
3. **Error Handling**: Graceful error handling with user feedback
4. **Pending Bet Management**: Bets are stored on-chain and can be cleared

### Betting Flow

1. **Place Bet**: Click on a betting square to place a bet (requires token approval)
2. **Spin**: Click the spin button to execute the wager
3. **Results**: View results and updated balances
4. **Payouts**: Winnings are automatically transferred to the player

## Recent Fixes

### Balance Update Issues (Fixed)

- **Problem**: Player and house balances weren't updating after transactions
- **Root Cause**: 
  - Roulette contract didn't handle actual token transfers
  - Balance updates happened before transaction confirmation
  - House balance only loaded once on component mount
- **Solution**:
  - Updated Roulette contract to handle real betting with token transfers
  - Implemented proper transaction confirmation flow
  - Added automatic balance refresh on block number changes
  - Fixed HouseInfo component to update with new transactions

### Technical Improvements

- **Contract Updates**: Added `placeBet()`, `clearBets()`, and proper payout logic
- **Frontend Updates**: Implemented transaction confirmation and error handling
- **Balance Management**: Real-time balance updates with proper timing
- **User Experience**: Better error messages and loading states

## Development

### Running Tests

```bash
npm test
```

### Contract Deployment

The contracts are automatically deployed during initialization. The deployment order is:
1. MyGameToken
2. RandomnessProvider  
3. Roulette (with dependencies)

### Environment Variables

The following environment variables can be set (with sensible defaults):
- `REACT_APP_FIRST_PLAYER_ADDRESS`
- `REACT_APP_SECOND_PLAYER_ADDRESS`
- `REACT_APP_THIRD_PLAYER_ADDRESS`
- `REACT_APP_HOUSE_ADDRESS`
- `REACT_APP_TOKEN_CONTRACT_ADDRESS`
- `REACT_APP_ROULETTE_CONTRACT_ADDRESS`

## Security Notes

⚠️ **Important**: This is a demo application with the following security considerations:

- **Randomness**: Uses on-chain randomness that is not secure for production
- **No Real Value**: Designed for testing and demonstration only
- **Local Network**: Only intended for local development

For production use, implement:
- Chainlink VRF for secure randomness
- Proper access controls
- Comprehensive testing
- Security audits

## Troubleshooting

### Common Issues

1. **"Insufficient allowance" error**
   - Run the initialization script to approve tokens
   - Check that you're using the correct network

2. **Balances not updating**
   - Ensure MetaMask is connected to localhost:8545
   - Check browser console for errors
   - Verify contracts are deployed correctly

3. **Transaction failures**
   - Check that you have sufficient tokens
   - Ensure the local blockchain is running
   - Verify contract addresses are correct

### Reset Everything

To start fresh:
```bash
# Stop all processes
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart hardhat node
npx hardhat node

# Reinitialize blockchain
npx hardhat run scripts/initializeChain.js --network localhost

# Start React app
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.