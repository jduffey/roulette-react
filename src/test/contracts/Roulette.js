/* global ethers:readonly */

const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const randomnessProviderAddress = "0x261D8c5e9742e6f7f1076Fa1F560894524e19cad";

describe("Roulette.sol", function () {

    // Create the fixture
    async function deployRouletteFixture() {
        const rouletteContractFactory = await ethers.getContractFactory("Roulette");
        const [acct0Signer] = await ethers.getSigners();

        const RouletteContract = await rouletteContractFactory.deploy(randomnessProviderAddress);

        await RouletteContract.deployed();

        // Return an object with the things we want to use in our tests
        return {
            // rouletteContractFactory,
            RouletteContract,
            acct0Signer,
        };
    }

    describe("Deployment", function () {
        // TODO: not important yet
        // it("sets the randomness provider address", async function () {
        //     const { RouletteContract } = await loadFixture(deployRouletteFixture);
        //     expect(await RouletteContract._randomnessProviderAddress()).to.equal(randomnessProviderAddress);
        // });
    });

    describe("ExecuteWager", function () {
        it("should emit a WagerSubmitted event", async function () {
            const {
                RouletteContract,
                acct0Signer,
            } = await loadFixture(deployRouletteFixture);
            const playerAddress = acct0Signer.address;
            const wagerAmount = 100;
            const betName = "MyFakeBetName";

            await expect(RouletteContract.executeWager(
                playerAddress,
                wagerAmount,
                1,
                "23",
                betName,
                1
            ))
                .to.emit(RouletteContract, "WagerSubmitted")
                .withArgs(playerAddress, wagerAmount, betName);
        });
    });


    // describe("Transactions", function () {
    //     it("Should transfer tokens between accounts", async function () {
    //         const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
    //         // Transfer 50 tokens from owner to addr1
    //         await expect(hardhatToken.transfer(addr1.address, 50))
    //             .to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

    //         // Transfer 50 tokens from addr1 to addr2
    //         // We use .connect(signer) to send a transaction from another account
    //         await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
    //             .to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    //     });

    //     it("should emit Transfer events", async function () {
    //         const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

    //         // Transfer 50 tokens from owner to addr1
    //         await expect(hardhatToken.transfer(addr1.address, 50))
    //             .to.emit(hardhatToken, "Transfer").withArgs(owner.address, addr1.address, 50)

    //         // Transfer 50 tokens from addr1 to addr2
    //         // We use .connect(signer) to send a transaction from another account
    //         await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
    //             .to.emit(hardhatToken, "Transfer").withArgs(addr1.address, addr2.address, 50)
    //     });

    //     it("Should fail if sender doesn't have enough tokens", async function () {
    //         const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);
    //         const initialOwnerBalance = await hardhatToken.balanceOf(
    //             owner.address
    //         );

    //         // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
    //         // `require` will evaluate false and revert the transaction.
    //         await expect(
    //             hardhatToken.connect(addr1).transfer(owner.address, 1)
    //         ).to.be.revertedWith("Not enough tokens");

    //         // Owner balance shouldn't have changed.
    //         expect(await hardhatToken.balanceOf(owner.address)).to.equal(
    //             initialOwnerBalance
    //         );
    //     });
    // });
});
