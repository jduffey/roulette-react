// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Roulette {
    uint256 private _totalSpins;
    uint256 private _jackpotBalance;

    function incrementTotalSpins() public {
        _totalSpins++;
    }

    function getTotalSpins() public view returns (uint256) {
        return _totalSpins;
    }

    function incrementJackpotBalance(uint256 amount) public {
        _jackpotBalance += amount;
    }

    function getJackpotBalance() public view returns (uint256) {
        return _jackpotBalance;
    }
}
