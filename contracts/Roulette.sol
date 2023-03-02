// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Roulette {
    uint256 private _totalSpins;

    function getTotalSpins() public view returns (uint256) {
        return _totalSpins;
    }

    function incrementTotalSpins() public {
        _totalSpins++;
    }
}
