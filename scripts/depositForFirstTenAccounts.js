/* global ethers:readonly */
/* global network:readonly */

async function depositEthForTokens() {
    if (network.name !== "localhost") {
        throw new Error(
            `\n*** You are running against network: [ ${network.name} ]\n` +
            "*** Pending further development, please run only against localhost.\n" +
            "*** Try again with\n" +
            "***     `npx hardhat run <SCRIPT_FILE_PATH> --network localhost`"
        );
    }

    const signers = await ethers.getSigners();
    const firstTenSigners = signers.slice(0, 10);

    const TOKEN_CONTRACT_ADDRESS = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";

    const firstTenTxs = firstTenSigners.map(async (signer) => {
        const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, [
            "function deposit() payable",
        ], signer);

        const tx = await token.deposit({
            value: ethers.utils.parseEther("1")
        });

        return tx;
    });

    return Promise.all(firstTenTxs);
}

depositEthForTokens()
    .then((transactions) => {
        console.log("\n***** ADDRESS DEPOSITS *****");
        transactions.forEach((tx) => {
            console.log(`${tx.from} deposited ${ethers.utils.formatEther(tx.value)} ETH`);
        });
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
