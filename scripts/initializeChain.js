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

async function _deployTokenContract(deployer) {
    const myGameTokenContractFactory = await ethers.getContractFactory(
        "MyGameToken",
        deployer
    );
    const myGameTokenContract = await myGameTokenContractFactory.deploy();
    await myGameTokenContract.deployed();

    console.log("\n***** CONTRACT DEPLOYED SUCCESSFULLY *****");
    console.log(`${await myGameTokenContract.name()}                              <- Contract name`);
    console.log(`${myGameTokenContract.address} <- Deployment address`);
    console.log(`${myGameTokenContract.signer.address} <- Deployer address`);
}

async function _depositEthForTokens(houseSigner, players) {
    const tokenContractAddress = ethers.utils.getContractAddress({ from: houseSigner.address, nonce: 0 });

    const playerTxs = players.map(async (signer) => {
        const token = new ethers.Contract(tokenContractAddress, [
            "function deposit() payable",
        ], signer);

        const tx = await token.deposit({
            value: ethers.utils.parseEther("1")
        });

        return tx;
    });

    const houseTx = (async (signer) => {
        const token = new ethers.Contract(tokenContractAddress, [
            "function deposit() payable",
        ], signer);

        const tx = await token.deposit({
            value: ethers.utils.parseEther("10")
        });

        return tx;
    })(houseSigner);

    const allTxns = [...playerTxs, houseTx];

    const resolvedTxs = await Promise.all(allTxns);

    console.log("\n***** ADDRESS DEPOSITS *****");
    resolvedTxs.forEach((tx) => {
        console.log(`${tx.from} deposited ${ethers.utils.formatEther(tx.value)} ETH`);
    });
}

async function initializeChain() {
    _validateNetwork();

    // The number of accounts generated is set in hardhat.config.js
    const signers = await ethers.getSigners();

    const [deployer] = signers.slice(-1);
    const players = signers.slice(0, -2);
    const [houseSigner] = signers.slice(-1);

    await _deployTokenContract(deployer);
    await _depositEthForTokens(houseSigner, players);
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
