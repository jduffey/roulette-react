// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//A token that acts like WETH but with a 1:100,000 ratio.
contract MyGameToken {
    string public name = "My Game Token";
    string public symbol = "GAME";
    uint8 public decimals = 18;
    uint256 private _tokensPerEth = 100_000;

    // event Approval(address indexed src, address indexed guy, uint256 wad);
    // event Transfer(address indexed src, address indexed dst, uint256 wad);
    event Deposit(address indexed addr, uint256 ethDeposited);
    event Redeem(address indexed src, uint256 tokensRedeemed);

    mapping(address => uint256) public balanceOf;
    // mapping(address => mapping(address => uint256)) public allowance;

    // receive() external payable {
    //     deposit();
    // }

    function deposit() public payable {
        _mint(msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function redeem(uint256 tokensToRedeem) public {
        require(balanceOf[msg.sender] >= tokensToRedeem, "Insufficient token balance");
        _burn(tokensToRedeem);
        emit Redeem(msg.sender, tokensToRedeem);
    }

    function _burn(uint256 tokensToRedeem) private {
        balanceOf[msg.sender] -= tokensToRedeem;
        uint256 etherOwed = tokensToRedeem / _tokensPerEth;
        payable(msg.sender).transfer(etherOwed);
    }

    function _mint(uint256 value) private {
        uint256 tokensToCredit = value * _tokensPerEth;
        balanceOf[msg.sender] += tokensToCredit;
    }

    function totalSupply() public view returns (uint256) {
        return address(this).balance * _tokensPerEth;
    }

    // function approve(address guy, uint256 wad) public returns (bool) {
    //     allowance[msg.sender][guy] = wad;
    //     emit Approval(msg.sender, guy, wad);
    //     return true;
    // }

    // function transfer(address dst, uint256 wad) public returns (bool) {
    //     return transferFrom(msg.sender, dst, wad);
    // }

    // function transferFrom(address src, address dst, uint256 wad) public returns (bool) {
    //     require(balanceOf[src] >= wad);

    //     // if (src != msg.sender && allowance[src][msg.sender] != type(uint256).max) {
    //     //     require(allowance[src][msg.sender] >= wad);
    //     //     allowance[src][msg.sender] -= wad;
    //     // }

    //     balanceOf[src] -= wad;
    //     balanceOf[dst] += wad;

    //     emit Transfer(src, dst, wad);

    //     return true;
    // }
}
