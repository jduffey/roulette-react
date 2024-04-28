const ethers = require("ethers");

async function main() {
    // Connection setup: this should point to your local or test network
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    // This should be the private key for one of your test accounts
    const privateKey = "your-private-key-here";  // Replace with your private key
    const wallet = new ethers.Wallet(privateKey, provider);

    // The contract address and ABI
    const contractAddress = "0xCba6b9A951749B8735C603e7fFC5151849248772";  // Replace with your contract's address
    const contractABI = [
        "function deposit() payable"
    ];

    // Create a contract instance
    const houseContract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Amount to deposit
    const depositAmount = ethers.utils.parseEther("1.0");  // 1 Ether

    console.log(`Depositing ${ethers.utils.formatEther(depositAmount)} ETH to the contract...`);

    // Perform the deposit transaction
    try {
        const tx = await houseContract.deposit({ value: depositAmount });
        await tx.wait();  // Wait for the transaction to be mined
        console.log(`Deposit successful! Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Failed to deposit ETH:", error);
    }
}

main().catch((error) => {
    console.error("Error in executing the script:", error);
    process.exit(1);  // Exit with a failure code
});
