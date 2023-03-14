// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./MyGameToken.sol";
import "./RandomnessProvider.sol";

import "hardhat/console.sol";

abstract contract ERC20Token {
    function transferFrom(address src, address dst, uint256 wad) public virtual returns (bool);
}

contract Roulette {
    RandomnessProvider private _randomnessProvider;
    MyGameToken private _myGameToken;

    mapping(address => NumberCompletionSet) private _playerNumberCompletionSets;

    struct NumberCompletionSet {
        uint256[] hitNumbers;
        mapping(uint256 => bool) numberIsHit;
        uint256 completionCounter;
    }

    event ExecutedWager(address indexed player, uint256 wheelNumber);

    constructor(address randomnessProviderAddress) {
        _randomnessProvider = RandomnessProvider(randomnessProviderAddress);
        // _myGameToken = MyGameToken(0xCE3478A9E0167a6Bc5716DC39DbbbfAc38F27623);
    }

    function _addToSet(address addr, uint256 wheelNumber) public {
        if (!_playerNumberCompletionSets[addr].numberIsHit[wheelNumber]) {
            _playerNumberCompletionSets[addr].hitNumbers.push(wheelNumber);
            _playerNumberCompletionSets[addr].numberIsHit[wheelNumber] = true;
        }

        uint8[38] memory completeSet = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37
        ];

        // check if set is complete and reset if so
        if (_playerNumberCompletionSets[addr].hitNumbers.length == completeSet.length) {
            for (uint256 i = 0; i < completeSet.length; i++) {
                _playerNumberCompletionSets[addr].numberIsHit[completeSet[i]] = false;
            }
            _playerNumberCompletionSets[addr].hitNumbers = new uint256[](0);
            _playerNumberCompletionSets[addr].completionCounter++;
        }
    }

    function getPlayerNumberCompletionSetsCounter(address player) public view returns (uint256) {
        return _playerNumberCompletionSets[player].completionCounter;
    }

    function getPlayerNumberCompletionSetCurrent(address player) public view returns (uint256[] memory) {
        return _playerNumberCompletionSets[player].hitNumbers;
    }

    function executeWager(address player) public {
        console.log("Executing wager for player: %s", player);
        console.log("This Roulette contract address: %s", address(this));
        uint256 randValue = _randomnessProvider.randomValue();
        uint256 wheelNumber = randValue % 38;

        _addToSet(player, wheelNumber);

        _myGameToken.transferFrom(player, address(this), 1);

        emit ExecutedWager(player, wheelNumber);
    }
}
