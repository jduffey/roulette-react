/* global ethers:readonly */

const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("MyGameToken contract", () => {
    async function deployTokenFixture() {
        const [acct0, acct1] = await ethers.getSigners();

        const MyGameTokenFactory = await ethers.getContractFactory("MyGameToken");
        const MyGameToken = await MyGameTokenFactory.deploy();
        await MyGameToken.deployed();

        return { MyGameToken, acct0, acct1 };
    }

    it("has common ERC20 properties", async () => {
        const { MyGameToken } = await loadFixture(deployTokenFixture);

        expect(await MyGameToken.name()).to.equal("My Game Token");
        expect(await MyGameToken.symbol()).to.equal("GAME");
        expect(await MyGameToken.decimals()).to.equal(18);
    });

    describe("receive()", () => {
        it("assigns 100,000 tokens per ETH transferred", async () => {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await acct0.sendTransaction({
                to: MyGameToken.address,
                value: ethers.utils.parseEther("1"),
            });

            expect(await MyGameToken.balanceOf(acct0.address))
                .to.equal(ethers.utils.parseEther("100000"));
        });
    });

    describe("deposit()", () => {
        it("assigns 100,000 tokens per ETH deposited", async () => {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await MyGameToken.deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.deposit({ value: ethers.utils.parseEther("1.5") });

            expect(await MyGameToken.balanceOf(acct0.address))
                .to.equal(ethers.utils.parseEther("250000"));
        });

        it("assigns the deposited ETH to the token contract", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.connect(acct1).deposit({ value: ethers.utils.parseEther("1.5") });

            expect(await ethers.provider.getBalance(MyGameToken.address))
                .to.equal(ethers.utils.parseEther("2.5"));
        });

        it("emits a Deposit event", async () => {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.deposit({ value: ethers.utils.parseEther("1") }))
                .to.emit(MyGameToken, "Deposit")
                .withArgs(acct0.address, ethers.utils.parseEther("1"));
        });
    });

    describe("redeem()", () => {
        it("reverts if the redemption amount exceeds the token balance", async () => {
            const { MyGameToken } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.redeem(ethers.utils.parseEther("1")))
                .to.be.revertedWith("Insufficient token balance");
        });

        it("emits a Redeem event", async () => {
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

                        expect(await MyGameToken.balanceOf(acct0.address))
                            .to.equal(expectedTokenBal);
                    });
            });
        });
    });

    describe("totalSupply()", () => {
        it("returns the total supply of tokens", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.connect(acct1).deposit({ value: ethers.utils.parseEther("1.5") });
            await MyGameToken.connect(acct0).redeem(ethers.utils.parseEther("30000"));

            expect(await MyGameToken.totalSupply())
                .to.equal(ethers.utils.parseEther("220000"));
        });
    });

    describe("approve()", () => {
        it("sets the allowance to the most recent value", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("12345"));
            await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("321"));

            expect(await MyGameToken.allowance(acct0.address, acct1.address))
                .to.equal(ethers.utils.parseEther("321"));
        });

        it("emits an Approval event", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("1")))
                .to.emit(MyGameToken, "Approval")
                .withArgs(acct0.address, acct1.address, ethers.utils.parseEther("1"));
        });
    });

    describe("transfer()", () => {
        it("reverts if msg.sender does not have enough tokens", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("1")))
                .to.be.revertedWith("Insufficient token balance");
        });

        it("can transfer the entire token balance (boundary condition)", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("100000"));

            expect(await MyGameToken.balanceOf(acct0.address))
                .to.equal(ethers.utils.parseEther("0"));
        });

        it("increases recipient token balance", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

            // Transfer twice to test that the balance is cumulative and not merely set to the value of the transfer
            // i.e. we need
            //    balanceOf[dst] += tokensToTransfer;
            // and not
            //    balanceOf[dst] = tokensToTransfer;
            await MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("250"));
            await MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("150"));

            expect(await MyGameToken.balanceOf(acct1.address))
                .to.equal(ethers.utils.parseEther("400"));
        });

        it("decreases sender token balance", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("5678"));

            expect(await MyGameToken.balanceOf(acct0.address))
                .to.equal(ethers.utils.parseEther("94322"));
        });

        it("emits a Transfer event", async () => {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

            await expect(MyGameToken.connect(acct0).transfer(acct1.address, ethers.utils.parseEther("5678")))
                .to.emit(MyGameToken, "Transfer")
                .withArgs(acct0.address, acct1.address, ethers.utils.parseEther("5678"));
        });
    });

    describe("transferFrom()", () => {
        describe("msg.sender is token owner", () => {
            it("reverts if the source does not have enough tokens", async () => {
                const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                await expect(MyGameToken.connect(acct0).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1")))
                    .to.be.revertedWith("Insufficient token balance");
            });
        });

        describe("msg.sender is not token owner", () => {
            describe("reversion scenarios", () => {
                it("source does not have enough tokens", async () => {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await expect(MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1")))
                        .to.be.revertedWith("Insufficient token balance");
                });

                it("caller does not have allowance to send tokens", async () => {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });

                    await expect(MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1")))
                        .to.be.revertedWith("Insufficient allowance");
                });

                it("caller has allowance but then runs out of allowance to send tokens", async () => {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
                    await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("5678"));
                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("5678"));

                    await expect(MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1")))
                        .to.be.revertedWith("Insufficient allowance");
                });
            });

            describe("successful scenarios", () => {
                it("can transfer the entire token balance when the transfer amount is equal to the approval allowance (boundary condition)", async () => {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
                    await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("100000"));
                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("100000"));

                    expect(await MyGameToken.balanceOf(acct1.address))
                        .to.equal(ethers.utils.parseEther("100000"));
                });

                it("can transfer the entire token balance when the transfer amount is less than the approval allowance (boundary condition)", async () => {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
                    await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("100000"));
                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("99999"));

                    expect(await MyGameToken.balanceOf(acct1.address))
                        .to.equal(ethers.utils.parseEther("99999"));
                });

                it("increases recipient token balance", async () => {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
                    await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("5678"));
                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("1230"));
                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("70"));

                    expect(await MyGameToken.balanceOf(acct1.address))
                        .to.equal(ethers.utils.parseEther("1300"));
                });

                it("decreases source token balance", async () => {
                    const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

                    await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
                    await MyGameToken.connect(acct0).approve(acct1.address, ethers.utils.parseEther("5678"));
                    await MyGameToken.connect(acct1).transferFrom(acct0.address, acct1.address, ethers.utils.parseEther("5678"));

                    expect(await MyGameToken.balanceOf(acct0.address))
                        .to.equal(ethers.utils.parseEther("94322"));
                });
            });
        });
    });
});
