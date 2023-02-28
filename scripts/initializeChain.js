/* global ethers:readonly */
/* global network:readonly */

async function initializeChain() {
    if (network.name !== "localhost") {
        throw new Error(
            `\n*** You are running against network: [ ${network.name} ]\n` +
            "*** Pending further development, please run only against localhost.\n" +
            "*** Try again with\n" +
            "***     `npx hardhat run <SCRIPT_FILE_PATH> --network localhost`"
        );
    }


    // Get the signers
    const signers = await ethers.getSigners();
    const [deployer] = signers.slice(-1); // use the last account generated by hardhat




    // Create and deploy the MyGameToken contract
    const myGameTokenContractFactory =
        await ethers.getContractFactory(
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

initializeChain()
    .then(async (foo) => {
        console.log("Chain initialized successfully");
        process.exit(0);
    })
    .catch((error) => {
        console.log("Error initializing chain:");
        console.error(error);
        process.exit(1);
    });
