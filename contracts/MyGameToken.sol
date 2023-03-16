// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// A token that acts like WETH but with a 1:100,000 ratio.
contract MyGameToken is ERC20, ReentrancyGuard {
    using SafeMath for uint256;

    uint256 private _tokensPerEth = 100_000;

    event Deposit(address indexed addr, uint256 ethDeposited);
    event Redeem(address indexed src, uint256 tokensRedeemed);

    constructor() ERC20("My Game Token", "GAME") {}

    receive() external payable {
        deposit();
    }

    function deposit() public payable nonReentrant {
        uint256 tokensToCredit = msg.value.mul(_tokensPerEth);
        _mint(msg.sender, tokensToCredit);
        emit Deposit(msg.sender, msg.value);
    }

    function redeem(uint256 tokensToRedeem) public nonReentrant {
        require(balanceOf(msg.sender) >= tokensToRedeem, "Insufficient token balance - CUSTOM MESSAGE, REPLACE MAYBE");
        uint256 etherOwed = tokensToRedeem.div(_tokensPerEth);
        _burn(msg.sender, tokensToRedeem);
        payable(msg.sender).transfer(etherOwed);
        emit Redeem(msg.sender, tokensToRedeem);
    }

    function totalSupply() public view override returns (uint256) {
        return address(this).balance.mul(_tokensPerEth);
    }
}
