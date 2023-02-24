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

    const players = signers.slice(0, -2);
    const [houseSigner] = signers.slice(-1);

    const TOKEN_CONTRACT_ADDRESS = ethers.utils.getContractAddress({ from: houseSigner.address, nonce: 0 });

    const playerTxs = players.map(async (signer) => {
        const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, [
            "function deposit() payable",
        ], signer);

        const tx = await token.deposit({
            value: ethers.utils.parseEther("1")
        });

        return tx;
    });

    const houseTx = (async (signer) => {
        const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, [
            "function deposit() payable",
        ], signer);

        const tx = await token.deposit({
            value: ethers.utils.parseEther("10")
        });

        return tx;
    })(houseSigner);

    const allTxns = [...playerTxs, houseTx];

    return Promise.all(allTxns);
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
