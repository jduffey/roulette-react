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
            playerAddress: signers[0].address,
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
                    playerAddress,
                } = await loadFixture(fixtures);

                await MockRandomnessProviderContract.setFakeRandomValue(fakeRandomValue);

                await expect(RouletteContract.executeWager(
                    playerAddress,
                ))
                    .to.emit(RouletteContract, "WheelNumber")
                    .withArgs(playerAddress, expectedWheelNumber);
            });
        });

        describe('getPlayerNumberCompletionSetCurrent', () => {
            it("spin result is added to set", async function () {
                const {
                    MockRandomnessProviderContract,
                    RouletteContract,
                    playerAddress,
                } = await loadFixture(fixtures);

                await MockRandomnessProviderContract.setFakeRandomValue(0);
                await RouletteContract.executeWager(playerAddress);

                const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(playerAddress);

                const expected = [0];
                expect(actual).to.deep.equal(expected);
            });

            it("duplicate spin result does not add to set", async function () {
                const {
                    MockRandomnessProviderContract,
                    RouletteContract,
                    playerAddress,
                } = await loadFixture(fixtures);

                await MockRandomnessProviderContract.setFakeRandomValue(0);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(0);
                await RouletteContract.executeWager(playerAddress);

                const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(playerAddress);

                const expected = [0];
                expect(actual).to.deep.equal(expected);
            });

            it("different spin results adds to set", async function () {
                const {
                    MockRandomnessProviderContract,
                    RouletteContract,
                    playerAddress,
                } = await loadFixture(fixtures);

                await MockRandomnessProviderContract.setFakeRandomValue(0);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(1);
                await RouletteContract.executeWager(playerAddress);

                const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(playerAddress);

                const expected = [0, 1];
                expect(actual).to.deep.equal(expected);
            });

            it("hitting all spin results resets set", async function () {
                const {
                    MockRandomnessProviderContract,
                    RouletteContract,
                    playerAddress,
                } = await loadFixture(fixtures);

                await MockRandomnessProviderContract.setFakeRandomValue(0);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(1);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(2);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(3);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(4);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(5);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(6);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(7);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(8);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(9);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(10);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(11);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(12);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(13);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(14);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(15);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(16);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(17);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(18);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(19);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(20);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(21);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(22);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(23);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(24);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(25);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(26);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(27);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(28);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(29);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(30);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(31);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(32);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(33);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(34);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(35);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(36);
                await RouletteContract.executeWager(playerAddress);

                await MockRandomnessProviderContract.setFakeRandomValue(37);
                await RouletteContract.executeWager(playerAddress);

                const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(playerAddress);

                const expected = [];
                expect(actual).to.deep.equal(expected);
            });
        });
    });
});
