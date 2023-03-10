/* global ethers:readonly */

const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    async function deployTokenFixture() {
        const [acct0, acct1] = await ethers.getSigners();

        const MyGameTokenFactory = await ethers.getContractFactory("MyGameToken");
        const MyGameToken = await MyGameTokenFactory.deploy();
        await MyGameToken.deployed();

        return { MyGameToken, acct0, acct1 };
    }

    describe("deposit()", function () {
        it("assigns 100,000 tokens per ETH deposited", async function () {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await MyGameToken.deposit({ value: ethers.utils.parseEther("1") });

            const actual = await MyGameToken.balanceOf(acct0.address);

            const expected = ethers.utils.parseEther("100000");
            expect(actual).to.equal(expected);
        });

        it("assigns the deposited ETH to the token contract", async function () {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.connect(acct1).deposit({ value: ethers.utils.parseEther("1.5") });

            const actual = await ethers.provider.getBalance(MyGameToken.address);

            const expected = ethers.utils.parseEther("2.5");
            expect(actual).to.equal(expected);
        });

        it("emits a Deposit event", async function () {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.deposit({ value: ethers.utils.parseEther("1") }))
                .to.emit(MyGameToken, "Deposit")
                .withArgs(acct0.address, ethers.utils.parseEther("1"));
        });
    });

    describe("withdraw()", function () {
        it("reverts if the withdraw amount exceeds the token balance", async function () {
            const { MyGameToken } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.withdraw(ethers.utils.parseEther("1")))
                .to.be.revertedWith("Insufficient token balance");
        });

        it("emits a Withdraw event", async function () {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await MyGameToken.deposit({ value: ethers.utils.parseEther("1") });

            await expect(MyGameToken.withdraw(ethers.utils.parseEther("56789")))
                .to.emit(MyGameToken, "Withdraw")
                .withArgs(acct0.address, ethers.utils.parseEther("56789"));
        });

        describe("reduces the token balance", () => {
            [
                [ethers.utils.parseEther("1"), ethers.utils.parseEther("100000"), ethers.utils.parseEther("0")],
                [ethers.utils.parseEther("1"), ethers.utils.parseEther("99999"), ethers.utils.parseEther("1")],
            ].forEach(([depositAmount, withdrawAmount, expectedTokenBal]) => {
                it(
                    `deposit: ${ethers.utils.formatEther(depositAmount)} ETH, ` +
                    `withdraw: ${ethers.utils.formatEther(withdrawAmount)} tokens, ` +
                    `expected token balance: ${ethers.utils.formatEther(expectedTokenBal)}`, async () => {
                        const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

                        await MyGameToken.deposit({ value: depositAmount });

                        await MyGameToken.withdraw(withdrawAmount);

                        const actual = await MyGameToken.balanceOf(acct0.address);

                        expect(actual).to.equal(expectedTokenBal);
                    });
            });
        });
    });

    describe("totalSupply()", function () {
        it("returns the total supply of tokens", async function () {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.connect(acct1).deposit({ value: ethers.utils.parseEther("1.5") });
            await MyGameToken.connect(acct0).withdraw(ethers.utils.parseEther("30000"));

            const actual = await MyGameToken.totalSupply();

            const expected = ethers.utils.parseEther("220000");
            expect(actual).to.equal(expected);
        });
    });
});