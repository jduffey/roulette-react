/* global ethers:readonly */
/* global network:readonly */

function _validateNetwork() {
    if (network.name !== "localhost") {
        throw new Error(
            `\n*** You are running against network: [ ${network.name} ]\n` +
            "*** Pending further development, please run only against localhost.\n" +
            "*** Try again with\n" +
            "***     `npx hardhat run <SCRIPT_FILE_PATH> --network localhost`"
        );
    }
}

async function _deployContract(deployer, contractName, args = []) {
    const contractFactory = await ethers.getContractFactory(
        contractName,
        deployer
    );
    const contract = await contractFactory.deploy(...args);
    await contract.deployed();

    console.log(`\n***** CONTRACT DEPLOYED SUCCESSFULLY - ${contractName} *****`);
    console.log(`${contract.address} <- Deployment address`);
    console.log(`${contract.signer.address} <- Deployer address`);

    return contract;
}

async function _depositEthForTokens(tokenContractAddress, ethDepositAmounts) {
    const depositTxs =
        Object.entries(ethDepositAmounts)
            .filter(([_, ethAmount]) => ethAmount > 0)
            .map(async ([address, ethAmount]) => {
                const signer = await ethers.provider.getSigner(address);
                const tokenContract = new ethers.Contract(
                    tokenContractAddress,
                    ["function deposit() payable"],
                    signer
                );
                const tx = await tokenContract.deposit({
                    value: ethers.utils.parseEther(ethAmount.toString())
                });
                return tx;
            });

    const resolvedTxs = await Promise.all(depositTxs);

    console.log("\n***** ADDRESS DEPOSITS *****");
    resolvedTxs.forEach((tx) => {
        console.log(`${tx.from} deposited ${ethers.utils.formatEther(tx.value)} ETH`);
    });
}

async function _approveAllowanceForRouletteContract(players, tokenContractAddress, rouletteContractAddress) {
    const approveTxs =
        players.map(async (player) => {
            const tokenContract = new ethers.Contract(
                tokenContractAddress,
                ["function approve(address, uint)"],
                player
            );
            const tx = await tokenContract.approve(
                rouletteContractAddress,
                ethers.utils.parseEther("100000")
            );
            return tx;
        });

    const resolvedTxs = await Promise.all(approveTxs);

    console.log("\n***** ADDRESS APPROVALS *****");
    resolvedTxs.forEach((tx) => {
        console.log(`${tx.from} approved 100000 tokens for roulette contract`);
    });
}

async function _fundRouletteContract(house, tokenContractAddress, rouletteContractAddress) {
    console.log("\n***** FUNDING ROULETTE CONTRACT *****");
    
    // Fund the Roulette contract with tokens to cover potential winnings
    // Calculate how much we need: max bet amount * max multiplier * number of max bets
    // Max bet: 1000 tokens, Max multiplier: 35x, Max bets: 20
    // So we need: 1000 * 35 * 20 = 700,000 tokens
    const fundingAmount = ethers.utils.parseEther("10000"); // Start with 10,000 tokens
    
    const tokenContract = new ethers.Contract(
        tokenContractAddress,
        ["function transfer(address,uint256)"],
        house
    );
    
    const tx = await tokenContract.transfer(rouletteContractAddress, fundingAmount);
    await tx.wait();
    
    console.log(`${house.address} funded Roulette contract with ${ethers.utils.formatEther(fundingAmount)} tokens`);
    
    // Verify the funding
    const tokenContractForBalance = new ethers.Contract(
        tokenContractAddress,
        ["function balanceOf(address) view returns (uint)"],
        house
    );
    const balance = await tokenContractForBalance.balanceOf(rouletteContractAddress);
    console.log(`Roulette contract balance: ${ethers.utils.formatEther(balance)} tokens`);
}

async function _updateBlockchainWrapperAddresses(addresses) {
    const fs = require('fs');
    const path = require('path');
    
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

async function initializeChain() {
    _validateNetwork();

    // The number of accounts generated by `npx hardhat node` is set in hardhat.config.js
    const signers = await ethers.getSigners();

    const players = signers.slice(0, -1); // All but the last signer are players
    const [house] = signers.slice(-1);    // The last signer is the House

    // Deploy contracts and capture their instances/addresses
    const tokenContract = await _deployContract(house, "MyGameToken");
    const randomnessProviderContract = await _deployContract(house, "RandomnessProvider");

    const rouletteContract = await _deployContract(house, "Roulette", [
        randomnessProviderContract.address,
        tokenContract.address
    ]);

    const ethToDeposit = players.reduce((acc, player) => {
        acc[player.address] = 1;
        return acc;
    }, {});
    ethToDeposit[house.address] = 10;

    await _depositEthForTokens(tokenContract.address, ethToDeposit);
    await _approveAllowanceForRouletteContract(players, tokenContract.address, rouletteContract.address);
    await _fundRouletteContract(house, tokenContract.address, rouletteContract.address);

    // Write contract addresses to a file for the frontend to use
    const fs = require('fs');
    const addresses = {
        TOKEN_CONTRACT_ADDRESS: tokenContract.address,
        RANDOMNESS_PROVIDER_CONTRACT_ADDRESS: randomnessProviderContract.address,
        ROULETTE_CONTRACT_ADDRESS: rouletteContract.address
    };
    fs.writeFileSync('./contract-addresses.json', JSON.stringify(addresses, null, 2));
    console.log('\n***** CONTRACT ADDRESSES SAVED *****');
    console.log('Contract addresses have been saved to contract-addresses.json');

    // Update the blockchainWrapper.js file with the new addresses
    await _updateBlockchainWrapperAddresses(addresses);
}

setTimeout(() => {
    initializeChain()
        .then(() => {
            console.log("\n✅ Chain initialized successfully ✅");
            process.exit(0);
        })
        .catch((error) => {
            console.log("\n❌ Error initializing chain ❌");
            console.error(error);
            process.exit(1);
        });
}, 2000); // Set a delay so that CI pipeline can wait for the chain to start before deploying contracts
