const fs = require('fs');
const path = require('path');

async function updateContractAddresses() {
    // Read the deployment addresses from the file created by initializeChain.js
    const addressesPath = path.join(__dirname, '../contract-addresses.json');
    
    if (!fs.existsSync(addressesPath)) {
        console.error('❌ contract-addresses.json not found. Please run npm run init-chain first.');
        process.exit(1);
    }
    
    const addresses = JSON.parse(fs.readFileSync(addressesPath, 'utf8'));

    const blockchainWrapperPath = path.join(__dirname, '../src/common/blockchainWrapper.js');
    let content = fs.readFileSync(blockchainWrapperPath, 'utf8');

    // Update the contract addresses
    content = content.replace(
        /const TOKEN_CONTRACT_ADDRESS = process\.env\.REACT_APP_TOKEN_CONTRACT_ADDRESS \|\| "[^"]*";/,
        `const TOKEN_CONTRACT_ADDRESS = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS || "${addresses.TOKEN_CONTRACT_ADDRESS}";`
    );

    content = content.replace(
        /const RANDOMNESS_PROVIDER_CONTRACT_ADDRESS = process\.env\.REACT_APP_RANDOMNESS_PROVIDER_CONTRACT_ADDRESS \|\| "[^"]*";/,
        `const RANDOMNESS_PROVIDER_CONTRACT_ADDRESS = process.env.REACT_APP_RANDOMNESS_PROVIDER_CONTRACT_ADDRESS || "${addresses.RANDOMNESS_PROVIDER_CONTRACT_ADDRESS}";`
    );

    content = content.replace(
        /const ROULETTE_CONTRACT_ADDRESS = process\.env\.REACT_APP_ROULETTE_CONTRACT_ADDRESS \|\| "[^"]*";/,
        `const ROULETTE_CONTRACT_ADDRESS = process.env.REACT_APP_ROULETTE_CONTRACT_ADDRESS || "${addresses.ROULETTE_CONTRACT_ADDRESS}";`
    );

    fs.writeFileSync(blockchainWrapperPath, content);
    console.log('✅ Contract addresses updated in blockchainWrapper.js');
}

updateContractAddresses().catch(console.error); 