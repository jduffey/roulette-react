/* global ethers:readonly */

const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Roulette.sol", () => {
    async function fixtures() {
        const signers = await ethers.getSigners();
        const deployerSigner = signers[4];

        const mockRandomnessProviderContractFactory = await ethers.getContractFactory("MockRandomnessProvider", deployerSigner);
        await mockRandomnessProviderContractFactory.deploy();
        const MockRandomnessProviderContract = await mockRandomnessProviderContractFactory.deploy();
        await MockRandomnessProviderContract.deployed();

        const myGameTokenContractFactory = await ethers.getContractFactory("MyGameToken", deployerSigner);
        const MyGameTokenContract = await myGameTokenContractFactory.deploy();
        await MyGameTokenContract.deployed();

        // Mint initial tokens to deployer by depositing ETH
        await MyGameTokenContract.deposit({ value: ethers.utils.parseEther("100") });

        const rouletteContractFactory = await ethers.getContractFactory("Roulette", deployerSigner);
        const RouletteContract = await rouletteContractFactory.deploy(
            MockRandomnessProviderContract.address,
            MyGameTokenContract.address
        );
        await RouletteContract.deployed();

        // Provide the Roulette contract with an initial bankroll of tokens to cover payouts
        await MyGameTokenContract.transfer(RouletteContract.address, ethers.utils.parseEther("1000000"));

        return {
            MockRandomnessProviderContract,
            RouletteContract,
            MyGameTokenContract,
            player1Address: signers[0].address,
            player2Address: signers[1].address,
        };
    }

    async function placeBetForPlayer(tokenContract, rouletteContract, playerAddress, amountEther = "1") {
        await tokenContract.transfer(playerAddress, ethers.utils.parseEther(amountEther));
        const playerSigner = await ethers.getSigner(playerAddress);
        await tokenContract.connect(playerSigner).approve(rouletteContract.address, ethers.utils.parseEther(amountEther));
        await rouletteContract.connect(playerSigner).placeBet("STRAIGHT_UP_0", ethers.utils.parseEther(amountEther));
    }

    async function spinWithBet(randomnessProvider, rouletteContract, tokenContract, playerAddress, fakeRandomValue) {
        await placeBetForPlayer(tokenContract, rouletteContract, playerAddress);
        if (fakeRandomValue !== undefined) {
            await randomnessProvider.setFakeRandomValue(fakeRandomValue);
        }
        const tx = await rouletteContract.executeWager(playerAddress);
        return tx;
    }

    describe("randomness provider determines the wheel number", () => {
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
            it(`returns ${expectedWheelNumber} when the randomness provider returns ${fakeRandomValue}`, async () => {
                const {
                    MockRandomnessProviderContract,
                    RouletteContract,
                    MyGameTokenContract,
                    player1Address,
                } = await loadFixture(fixtures);

                // Give player tokens and approve Roulette contract, capturing the wager execution
                const tx = await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, fakeRandomValue);

                await expect(tx)
                    .to.emit(RouletteContract, "ExecutedWager")
                    .withArgs(player1Address, expectedWheelNumber, anyValue, anyValue);
            });
        });
    });

    describe('getPlayerNumberCompletionSetCurrent', () => {
        it("spin result is added to set", async () => {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                MyGameTokenContract,
                player1Address,
            } = await loadFixture(fixtures);

            // setup bet
            await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, 0);

            const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(player1Address);

            const expected = [0];
            expect(actual).to.deep.equal(expected);
        });

        it("spin result is not added to set belonging to another address", async () => {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                MyGameTokenContract,
                player1Address,
                player2Address,
            } = await loadFixture(fixtures);

            // setup bet
            await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, 0);

            const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(player2Address);

            const expected = [];
            expect(actual).to.deep.equal(expected);
        });

        it("duplicate spin result does not add to set", async () => {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                MyGameTokenContract,
                player1Address,
            } = await loadFixture(fixtures);

            // setup bet
            await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, 0);

            await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, 0);

            const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(player1Address);

            const expected = [0];
            expect(actual).to.deep.equal(expected);
        });

        it("different spin results adds to set", async () => {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                MyGameTokenContract,
                player1Address,
            } = await loadFixture(fixtures);

            // setup bet
            await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, 0);

            await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, 1);

            const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(player1Address);

            const expected = [0, 1];
            expect(actual).to.deep.equal(expected);
        });

        it("hitting all spin results resets set", async () => {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                MyGameTokenContract,
                player1Address,
            } = await loadFixture(fixtures);

            // Reminder: these are values supplied by the RandomnessProvider contract, not the spin results
            // They are stand-ins for uint256 values
            const fakeRandomValues = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37
            ];

            // Execute wagers sequentially to avoid race conditions
            for (let i = 0; i < fakeRandomValues.length; i++) {
                await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, fakeRandomValues[i]);
            }

            const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(player1Address);

            const expected = [];
            expect(actual).to.deep.equal(expected);
        });

        it("spin results are added to set again after it is reset", async () => {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                MyGameTokenContract,
                player1Address,
            } = await loadFixture(fixtures);

            const fakeRandomValues = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37
            ];

            // Execute wagers sequentially to avoid race conditions
            for (let i = 0; i < fakeRandomValues.length; i++) {
                await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, fakeRandomValues[i]);
            }

            await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, 0);

            const actual = await RouletteContract.getPlayerNumberCompletionSetCurrent(player1Address);

            const expected = [0];
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('getPlayerNumberCompletionSetsCounter', () => {
        it("returns 0 when no sets have been completed", async () => {
            const {
                RouletteContract,
                MyGameTokenContract,
                player1Address,
            } = await loadFixture(fixtures);

            const actual = await RouletteContract.getPlayerNumberCompletionSetsCounter(player1Address);

            const expected = 0;
            expect(actual).to.equal(expected);
        });

        it("returns 1 when one set has been completed", async () => {
            const {
                MockRandomnessProviderContract,
                RouletteContract,
                MyGameTokenContract,
                player1Address,
            } = await loadFixture(fixtures);

            const fakeRandomValues = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37
            ];

            // Execute wagers sequentially to avoid race conditions
            for (let i = 0; i < fakeRandomValues.length; i++) {
                await spinWithBet(MockRandomnessProviderContract, RouletteContract, MyGameTokenContract, player1Address, fakeRandomValues[i]);
            }

            const actual = await RouletteContract.getPlayerNumberCompletionSetsCounter(player1Address);

            const expected = 1;
            expect(actual).to.equal(expected);

        });
    });
});
