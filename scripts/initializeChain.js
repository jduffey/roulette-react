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

async function _deployContract(deployer, contractName, args) {
    const contractFactory = await ethers.getContractFactory(
        contractName,
        deployer
    );
    let contract;
    if (args) {
        contract = await contractFactory.deploy(args);
    } else {
        contract = await contractFactory.deploy();
    }
    await contract.deployed();

    console.log(`\n***** CONTRACT DEPLOYED SUCCESSFULLY - ${contractName} *****`);
    console.log(`${contract.address} <- Deployment address`);
    console.log(`${contract.signer.address} <- Deployer address`);
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

async function _approveAllowanceForRouletteContract(players, tokenContractAddress) {
    const approveTxs =
        players.map(async (player) => {
            const tokenContract = new ethers.Contract(
                tokenContractAddress,
                ["function approve(address, uint)"],
                player
            );
            const tx = await tokenContract.approve(
                "0xCE3478A9E0167a6Bc5716DC39DbbbfAc38F27623",
                ethers.utils.parseEther("100000")
            );
            return tx;
        });

    const resolvedTxs = await Promise.all(approveTxs);

    console.log("\n***** ADDRESS APPROVALS *****");
    resolvedTxs.forEach((tx) => {
        console.log(`${tx.from} approved ${ethers.utils.formatEther(tx.value)} ETH`);
    });
}

async function initializeChain() {
    _validateNetwork();

    // The number of accounts generated by `npx hardhat node` is set in hardhat.config.js
    const signers = await ethers.getSigners();

    const players = signers.slice(0, -1); // All but the last signer are players
    const [house] = signers.slice(-1);    // The last signer is the House

    const tokenContractAddress = ethers.utils.getContractAddress({ from: house.address, nonce: 0 });

    const ethToDeposit = players.reduce((acc, player) => {
        acc[player.address] = 1;
        return acc;
    }, {});
    ethToDeposit[house.address] = 10;

    await _deployContract(house, "MyGameToken");
    await _deployContract(house, "RandomnessProvider")
    await _deployContract(house, "Roulette", "0x261D8c5e9742e6f7f1076Fa1F560894524e19cad");
    await _depositEthForTokens(tokenContractAddress, ethToDeposit);
    await _approveAllowanceForRouletteContract(players, tokenContractAddress);
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
