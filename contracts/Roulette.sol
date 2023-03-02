// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Roulette {
    uint256 private _totalSpins;
    uint256 private _totalAmountWagered;

    mapping(address => uint256) private _playerSpins;

    function _incrementTotalSpins() private {
        _totalSpins++;
    }

    function _incrementTotalAmountWagered(uint256 amount) private {
        _totalAmountWagered += amount;
    }

    function _incrementPlayerSpins(address player) private {
        _playerSpins[player]++;
    }

    function getTotalSpins() public view returns (uint256) {
        return _totalSpins;
    }

    function getTotalAmountWagered() public view returns (uint256) {
        return _totalAmountWagered;
    }

    function getPlayerSpins(address player) public view returns (uint256) {
        return _playerSpins[player];
    }

    function executeWager(address player, uint256 amount) public {
        _incrementTotalSpins();
        _incrementTotalAmountWagered(amount);
        _incrementPlayerSpins(player);
    }
}
