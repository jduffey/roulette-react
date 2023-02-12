// npx hardhat run scripts/showAccounts.js --network localhost
// const ethers = require("@nomiclabs/hardhat-ethers");

// const path = require("path");

async function main() {
    const signers = await ethers.getSigners();

    // console.log(signers.map(s => {
    //     return s.address;
    // }));

    console.log('Address, Balance');

    await Promise.all(signers.map(async (signer) => {
        const balance = await signer.getBalance();
        console.log(signer.address, ethers.utils.formatEther(balance));
        // return { [signer.address]: ethers.utils.formatEther(balance) };
    }));

    // const balances = await Promise.all(signers.map(async (signer) => {
    //     const balance = await signer.getBalance();
    //     console.log(signer.address, ethers.utils.formatEther(balance));
    //     return { [signer.address]: ethers.utils.formatEther(balance) };
    // }));

    // console.log(signers.map(s => s.address));

    // const balances = await Promise.all(signers.map(s => s.address).reduce(async (acc, signer) => {
    //     const balance = await signer.getBalance();
    //     console.log(signer.address, ethers.utils.formatEther(balance));
    //     acc[signer.address] = ethers.utils.formatEther(balance);
    //     return acc;
    // }, {}));

    // saveFrontendFiles(balances);
}

function saveFrontendFiles(balances) {
    // const fs = require("fs");
    // const contractsDir = path.join(__dirname, "..", "frontend", "src", "info");

    // if (!fs.existsSync(contractsDir)) {
    //     fs.mkdirSync(contractsDir);
    // }

    // fs.writeFileSync(
    //     path.join(contractsDir, "balances.json"),
    //     JSON.stringify({ balances: balances }, undefined, 4)
    // );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
