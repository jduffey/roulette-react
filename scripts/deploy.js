// const path = require("path");

async function main() {
    // This is just a convenience check
    if (network.name !== "localhost") {
        console.warn(
            `*** You are deploying to network: [ ${network.name} ]\n` +
            "*** Pending further development, please deploy only to localhost.\n" +
            "*** Try again with\n" +
            "***     `npx hardhat run scripts/deploy.js --network localhost`"
        );
        return;
    }

    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const WrappedEthTokenContract = await ethers.getContractFactory("WETH100Kv2");
    const token = await WrappedEthTokenContract.deploy();
    await token.deployed();

    console.log("Token address:", token.address);

    // We also save the contract's artifacts and address in the frontend directory
    //   saveFrontendFiles(token);
}

// function saveFrontendFiles(token) {
//     const fs = require("fs");
//     const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

//     if (!fs.existsSync(contractsDir)) {
//         fs.mkdirSync(contractsDir);
//     }

//     fs.writeFileSync(
//         path.join(contractsDir, "contract-address.json"),
//         JSON.stringify({ Token: token.address }, undefined, 2)
//     );

//     const TokenArtifact = artifacts.readArtifactSync("Token");

//     fs.writeFileSync(
//         path.join(contractsDir, "Token.json"),
//         JSON.stringify(TokenArtifact, null, 2)
//     );
// }

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
