// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Roulette {
    uint256 private _totalSpins;
    uint256 private _totalAmountWagered;

    function _incrementTotalSpins() private {
        _totalSpins++;
    }

    function _incrementTotalAmountWagered(uint256 amount) private {
        _totalAmountWagered += amount;
    }

    function getTotalSpins() public view returns (uint256) {
        return _totalSpins;
    }

    function getTotalAmountWagered() public view returns (uint256) {
        return _totalAmountWagered;
    }

    function executeWager(uint256 amount) public {
        _incrementTotalSpins();
        _incrementTotalAmountWagered(amount);
    }
}
