// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract GamesPlayedCounter {
    uint256 private _count;

    function getCount() public view returns (uint256) {
        return _count;
    }

    function increment() public {
        _count++;
    }
}
