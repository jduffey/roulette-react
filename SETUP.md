# Quick Setup Guide

## One-Command Setup (Recommended)

```bash
npm run setup
```

This will:
1. Install all dependencies
2. Start the local blockchain
3. Deploy and initialize all contracts
4. Automatically update contract addresses in the frontend
5. Set up the game environment

After setup completes, run:
```bash
npm start
```

## Manual Setup

If you prefer to run each step manually:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start local blockchain** (in one terminal)
   ```bash
   npm run start-chain
   ```

3. **Initialize blockchain** (in another terminal)
   ```bash
   npm run init-chain
   ```

4. **Update contract addresses** (in another terminal)
   ```bash
   npm run update-addresses
   ```

5. **Start the app** (in another terminal)
   ```bash
   npm start
   ```

## Connect MetaMask

1. Open MetaMask
2. Add network:
   - Network Name: Localhost 8545
   - RPC URL: http://localhost:8545
   - Chain ID: 1337
   - Currency Symbol: ETH

3. Import a test account using one of these private keys:
   - `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
   - `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

## Verify Setup

1. The app should load at http://localhost:3000
2. Connect MetaMask to the localhost network
3. You should see your balance displayed
4. Try placing a bet and spinning the wheel

## Troubleshooting

- **"Insufficient allowance"**: Run `npm run init-chain` again
- **"Network error"**: Make sure the blockchain is running with `npm run start-chain`
- **"Contract not found"**: Check that initialization completed successfully
- **"call revert exception"**: Run `npm run update-addresses` to sync contract addresses
- **Contract addresses mismatch**: The setup script now automatically handles this - just run `npm run setup`

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [KNOWN_BUGS.md](KNOWN_BUGS.md) for known issues
- Run `npm test` to verify everything is working 