/* global ethers:readonly */

const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

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

        it("emits a Deposit event with depositor address, ETH deposited, and tokens issued", async function () {
            const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

            await expect(MyGameToken.deposit({ value: ethers.utils.parseEther("1") }))
                .to.emit(MyGameToken, "Deposit")
                .withArgs(acct0.address, ethers.utils.parseEther("1"));
        });
    });

    // describe("withdraw()", function () {
    //     it("withdraws 100,000 tokens per ETH withdrawn from depositor address", async function () {
    //         const { MyGameToken, acct0 } = await loadFixture(deployTokenFixture);

    //         const ethBalBefore = await ethers.provider.getBalance(acct0.address);

    //         await MyGameToken.deposit({ value: ethers.utils.parseEther("1") });
    //         await MyGameToken.withdraw(ethers.utils.parseEther("12345"));

    //         const ethBalAfter = await ethers.provider.getBalance(acct0.address);

    //         const actual = await MyGameToken.balanceOf(acct0.address);

    //         const expected = ethers.utils.parseEther("87655");
    //         expect(actual).to.equal(expected);
    //         expect(ethBalAfter.sub(ethBalBefore)).to.equal(ethers.utils.parseEther("0"));
    //     });
    // });

    describe("totalSupply()", function () {
        it("returns the total supply of tokens", async function () {
            const { MyGameToken, acct0, acct1 } = await loadFixture(deployTokenFixture);

            await MyGameToken.connect(acct0).deposit({ value: ethers.utils.parseEther("1") });
            await MyGameToken.connect(acct1).deposit({ value: ethers.utils.parseEther("1.5") });

            const actual = await MyGameToken.totalSupply();

            const expected = ethers.utils.parseEther("250000");
            expect(actual).to.equal(expected);
        });
    });

    // describe("Transactions", function () {
    //     it("Should transfer tokens between accounts", async function () {
    //         const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
    //             deployTokenFixture
    //         );
    //         // Transfer 50 tokens from owner to addr1
    //         await expect(
    //             hardhatToken.transfer(addr1.address, 50)
    //         ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

    //         // Transfer 50 tokens from addr1 to addr2
    //         // We use .connect(signer) to send a transaction from another account
    //         await expect(
    //             hardhatToken.connect(addr1).transfer(addr2.address, 50)
    //         ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    //     });

    //     it("Should emit Transfer events", async function () {
    //         const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
    //             deployTokenFixture
    //         );

    //         // Transfer 50 tokens from owner to addr1
    //         await expect(hardhatToken.transfer(addr1.address, 50))
    //             .to.emit(hardhatToken, "Transfer")
    //             .withArgs(owner.address, addr1.address, 50);

    //         // Transfer 50 tokens from addr1 to addr2
    //         // We use .connect(signer) to send a transaction from another account
    //         await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
    //             .to.emit(hardhatToken, "Transfer")
    //             .withArgs(addr1.address, addr2.address, 50);
    //     });

    //     it("Should fail if sender doesn't have enough tokens", async function () {
    //         const { hardhatToken, owner, addr1 } = await loadFixture(
    //             deployTokenFixture
    //         );
    //         const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    //         // Try to send 1 token from addr1 (0 tokens) to owner.
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