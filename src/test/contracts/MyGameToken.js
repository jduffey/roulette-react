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

    it("has common ERC20 properties", async function () {
        const { MyGameToken } = await loadFixture(deployTokenFixture);

        expect(await MyGameToken.name()).to.equal("My Game Token");
        expect(await MyGameToken.symbol()).to.equal("GAME");
        expect(await MyGameToken.decimals()).to.equal(18);
    });

    describe("receive()", function () {
        it("assigns 100,000 tokens per ETH transferred", async function () {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await acct0.sendTransaction({
                to: MyGameToken.address,
                value: ethers.utils.parseEther("1"),
            });

            const actual = await MyGameToken.balanceOf(acct0.address);

            const expected = ethers.utils.parseEther("100000");
            expect(actual).to.equal(expected);
        });
    });

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

    describe("redeem()", function () {
        it("reverts if the redemption amount exceeds the token balance", async function () {
            const { MyGameToken } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.redeem(ethers.utils.parseEther("1")))
                .to.be.revertedWith("Insufficient token balance");
        });

        it("emits a Redeem event", async function () {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await MyGameToken.deposit({ value: ethers.utils.parseEther("1") });

            await expect(MyGameToken.redeem(ethers.utils.parseEther("56789")))
                .to.emit(MyGameToken, "Redeem")
                .withArgs(acct0.address, ethers.utils.parseEther("56789"));
        });

        describe("reduces the token balance", () => {
            [
                [ethers.utils.parseEther("1"), ethers.utils.parseEther("100000"), ethers.utils.parseEther("0")],
                [ethers.utils.parseEther("1"), ethers.utils.parseEther("99999"), ethers.utils.parseEther("1")],
            ].forEach(([depositAmt, redemptionAmt, expectedTokenBal]) => {
                it(
                    `deposit: ${ethers.utils.formatEther(depositAmt)} ETH, ` +
                    `redeem: ${ethers.utils.formatEther(redemptionAmt)} tokens, ` +
                    `expected token balance: ${ethers.utils.formatEther(expectedTokenBal)}`, async () => {
                        const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

                        await MyGameToken.deposit({ value: depositAmt });

                        await MyGameToken.redeem(redemptionAmt);

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
            await MyGameToken.connect(acct0).redeem(ethers.utils.parseEther("30000"));

            const actual = await MyGameToken.totalSupply();

            const expected = ethers.utils.parseEther("220000");
            expect(actual).to.equal(expected);
        });
    });

    // describe("approve()", function () {
    //     it("emits an Approval event", async function () {
    //         // TODO: implement
    //     });
    // });

    describe("transfer()", function () {
        it("reverts if the sender does not have enough tokens", async function () {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("1")))
                .to.be.revertedWith("Insufficient token balance");
        });

        it("increases recipient token balance", async function () {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

            await MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("5678"));

            const actual = await MyGameToken.balanceOf(acct1.address);

            const expected = ethers.utils.parseEther("5678");
            expect(actual).to.equal(expected);
        });

        it("decreases sender token balance", async function () {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

            await MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("5678"));

            const actual = await MyGameToken.balanceOf(acct0.address);

            const expected = ethers.utils.parseEther("94322");
            expect(actual).to.equal(expected);
        });

        it("emits a Transfer event", async function () {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

            await expect(MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("5678")))

                .to.emit(MyGameToken, "Transfer")
                .withArgs(acct0.address, acct1.address, ethers.utils.parseEther("5678"));
        });
    });

    describe("transferFrom()", function () {
        describe("msg.sender is token owner", () => {
            it("reverts if the source does not have enough tokens", async function () {
                const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                await expect(MyGameToken.connect(acct0).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1")))
                    .to.be.revertedWith("Insufficient token balance");
            });
        });

        describe("msg.sender is not token owner", () => {
            describe("reversion scenarios", () => {
                it("source does not have enough tokens", async function () {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await expect(MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1")))
                        .to.be.revertedWith("Insufficient token balance");
                });

                it("caller does not have allowance to send tokens", async function () {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

                    await expect(MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1")))
                        .to.be.revertedWith("Insufficient allowance");
                });
            });

            describe("successful scenarios", () => {
                it("increases recipient token balance", async function () {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

                    await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("5678"));

                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("5678"));

                    const actual = await MyGameToken.balanceOf(acct1.address);

                    const expected = ethers.utils.parseEther("5678");
                    expect(actual).to.equal(expected);
                });

                it("decreases sender token balance", async function () {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

                    await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("5678"));

                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("5678"));

                    const actual = await MyGameToken.balanceOf(acct0.address);

                    const expected = ethers.utils.parseEther("94322");
                    expect(actual).to.equal(expected);
                });
            });
        });
    });
});
