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

    describe("randomness provider determines the wheel number", function () {
        ([
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
            [5, 5],
            [6, 6],
            [7, 7],
            [8, 8],
            [9, 9],
            [10, 10],
            [11, 11],
            [12, 12],
            [13, 13],
            [14, 14],
            [15, 15],
            [16, 16],
            [17, 17],
            [18, 18],
            [19, 19],
            [20, 20],
            [21, 21],
            [22, 22],
            [23, 23],
            [24, 24],
            [25, 25],
            [26, 26],
            [27, 27],
            [28, 28],
            [29, 29],
            [30, 30],
            [31, 31],
            [32, 32],
            [33, 33],
            [34, 34],
            [35, 35],
            [36, 36],
            [37, 37],
            [0, 38],
            [15, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"],
            [14, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE"],
            [13, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD"],
            [12, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC"],
            [11, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFB"],
            [10, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA"],
            [9, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9"],
            [8, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF8"],
            [7, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7"],
            [6, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF6"],
            [5, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5"],
            [4, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF4"],
            [3, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF3"],
            [2, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF2"],
            [1, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF1"],
            [0, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0"],
            [37, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEF"],
            [36, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEE"],
            [35, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFED"],
            [34, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEC"],
            [33, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEB"],
            [32, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEA"],
            [31, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE9"],
            [30, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE8"],
            [29, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE7"],
            [28, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE6"],
            [27, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE5"],
            [26, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE4"],
            [25, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE3"],
            [24, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE2"],
            [23, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE1"],
            [22, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0"],
            [21, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDF"],
            [20, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDE"],
            [19, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDD"],
            [18, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDC"],
            [17, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDB"],
            [16, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDA"],
            [15, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD9"],
        ]).forEach(([expectedWheelNumber, fakeRandomValue]) => {
            it(`returns ${expectedWheelNumber} when the randomness provider returns ${fakeRandomValue}`, async function () {
                const {
                    MockRandomnessProviderContract,
                    RouletteContract,
                    signers,
                } = await loadFixture(fixtures);
                const playerAddress = signers[0].address;
                const wagerAmount = 100;
                const betName = "MyFakeBetName";

                await MockRandomnessProviderContract.setFakeRandomValue(fakeRandomValue);

                await expect(RouletteContract.executeWager(
                    playerAddress,
                    wagerAmount,
                    1,
                    "23",
                    betName,
                    1
                ))
                    .to.emit(RouletteContract, "WheelNumber")
                    .withArgs(expectedWheelNumber);
            });
        });
    });

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
