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

async function _deployContract(deployer, contractName) {
    const contractFactory = await ethers.getContractFactory(
        contractName,
        deployer
    );
    const contract = await contractFactory.deploy();
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

async function initializeChain() {
    _validateNetwork();

    // The number of accounts generated by `npx hardhat node` is set in hardhat.config.js
    const signers = await ethers.getSigners();

    const players = signers.slice(0, -2); // All but the last two signers are Players
    const [jackpot] = signers.slice(-2);  // The second-to-last signer is the Jackpot address
    const [house] = signers.slice(-1);    // The last signer is the House

    const tokenContractAddress = ethers.utils.getContractAddress({ from: house.address, nonce: 0 });

    const ethToDeposit = players.reduce((acc, player) => {
        acc[player.address] = 1;
        return acc;
    }, {});
    ethToDeposit[jackpot.address] = 0;
    ethToDeposit[house.address] = 10;

    await _deployContract(house, "MyGameToken");
    await _deployContract(house, "GamesPlayedCounter");
    await _depositEthForTokens(tokenContractAddress, ethToDeposit);
}

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
