require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 1337, // From hardhat-boilerplate tutorial: setting to 1337 makes interacting with MetaMask simpler
            accounts: {
                count: 5, // default: 20
                initialIndex: 0, // default: 0
                accountsBalance: "10000000000000000000000", // default: 10000000000000000000000 (wei, or 10,000 ETH)
            },
        },
    },
};
