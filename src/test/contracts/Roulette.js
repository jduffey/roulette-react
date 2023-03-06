/* global ethers:readonly */

const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Roulette.sol", function () {
    async function fixtures() {
        const signers = await ethers.getSigners();

        const mockRandomnessProviderContractFactory = await ethers.getContractFactory("MockRandomnessProvider");
        await mockRandomnessProviderContractFactory.deploy();
        const MockRandomnessProviderContract = await mockRandomnessProviderContractFactory.deploy();
        await MockRandomnessProviderContract.deployed();

        const rouletteContractFactory = await ethers.getContractFactory("Roulette");
        const RouletteContract = await rouletteContractFactory.deploy(MockRandomnessProviderContract.address);
        await RouletteContract.deployed();

        return {
            MockRandomnessProviderContract,
            RouletteContract,
            signers,
        };
    }

    describe("ExecuteWager", function () {
        it("should emit a WagerSubmitted event", async function () {
            const {
                RouletteContract,
                signers,
            } = await loadFixture(fixtures);
            const playerAddress = signers[0].address;
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

        it("should emit a RandomnessObtained event with the value returned from the randomness provider", async function () {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                signers,
            } = await loadFixture(fixtures);
            const playerAddress = signers[0].address;
            const wagerAmount = 100;
            const betName = "MyFakeBetName";

            const fakeRandomValue = 123;

            await MockRandomnessProviderContract.setFakeRandomValue(fakeRandomValue);

            await expect(RouletteContract.executeWager(
                playerAddress,
                wagerAmount,
                1,
                "23",
                betName,
                1
            ))
                .to.emit(RouletteContract, "RandomnessObtained")
                .withArgs(fakeRandomValue);
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
