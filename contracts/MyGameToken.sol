// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MyGameToken {
    string public name = "My Game Token";
    string public symbol = "GAME";
    uint8 public decimals = 18;
    uint256 private _tokensPerEth = 100_000;

    event Approval(address indexed src, address indexed guy, uint256 wad);
    event Transfer(address indexed src, address indexed dst, uint256 wad);
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        uint256 tokensToCredit = msg.value * _tokensPerEth;
        balanceOf[msg.sender] += tokensToCredit;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 wad) public {
        require(balanceOf[msg.sender] >= wad, "Insufficient token balance");
        // TODO look into https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol
        // if we want to provide more info in the error message using string concatenation with uint256->string casting
        // "Insufficient token balance: attempted to withdraw " + wad + " but only " + balanceOf[msg.sender] + " available.");
        balanceOf[msg.sender] -= wad;
        uint256 etherOwed = wad / _tokensPerEth;
        payable(msg.sender).transfer(etherOwed);
        emit Withdrawal(msg.sender, wad);
    }

    function totalSupply() public view returns (uint256) {
        return address(this).balance * _tokensPerEth;
    }

    function approve(address guy, uint256 wad) public returns (bool) {
        allowance[msg.sender][guy] = wad;
        emit Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint256 wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint256 wad) public returns (bool) {
        require(balanceOf[src] >= wad);

        if (src != msg.sender && allowance[src][msg.sender] != type(uint256).max) {
            require(allowance[src][msg.sender] >= wad);
            allowance[src][msg.sender] -= wad;
        }

        balanceOf[src] -= wad;
        balanceOf[dst] += wad;

        emit Transfer(src, dst, wad);

        return true;
    }
}