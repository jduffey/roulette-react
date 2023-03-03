// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Roulette {
    uint256 private _totalSpins;
    uint256 private _totalAmountWagered;

    mapping(address => uint256) private _playerSpins;
    mapping(address => uint256) private _playerRewards;
    mapping(address => NumberCompletionSet) private _playerNumberCompletionSets;

    struct NumberCompletionSet {
        string[] values;
        mapping(string => bool) is_in;
        uint256 completionCounter;
    }

    function _addToSet(address addr, string memory wheelNumber) public {
        if (!_playerNumberCompletionSets[addr].is_in[wheelNumber]) {
            _playerNumberCompletionSets[addr].values.push(wheelNumber);
            _playerNumberCompletionSets[addr].is_in[wheelNumber] = true;
        }

        // check if set is complete and reset if so
        if (_playerNumberCompletionSets[addr].values.length == 38) {
            _playerNumberCompletionSets[addr].completionCounter++;

            string[38] memory completeSet = [
                "00",
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30",
                "31",
                "32",
                "33",
                "34",
                "35",
                "36"
            ];
            for (uint256 i = 0; i < completeSet.length; i++) {
                _playerNumberCompletionSets[addr].is_in[completeSet[i]] = false;
            }
            _playerNumberCompletionSets[addr].values = new string[](0);
        }
    }

    function _incrementTotalSpins() private {
        _totalSpins++;
    }

    function _incrementTotalAmountWagered(uint256 amount) private {
        _totalAmountWagered += amount;
    }

    function _incrementPlayerSpins(address player) private {
        _playerSpins[player]++;
    }

    function _incrementPlayerRewards(address player, uint256 amount) private {
        _playerRewards[player] += amount;
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

    function getPlayerRewards(address player) public view returns (uint256) {
        return _playerRewards[player];
    }

    function getPlayerNumberCompletionSetsCounter(
        address player
    ) public view returns (uint256) {
        return _playerNumberCompletionSets[player].completionCounter;
    }

    function getPlayerNumberCompletionSetCurrent(
        address player
    ) public view returns (string[] memory) {
        return _playerNumberCompletionSets[player].values;
    }

    function executeWager(
        address player,
        uint256 wagerAmount,
        uint256 playerRewards,
        string memory wheelNumber
    ) public {
        _incrementTotalSpins();
        _incrementTotalAmountWagered(wagerAmount);
        _incrementPlayerSpins(player);
        _incrementPlayerRewards(player, playerRewards);
        _addToSet(player, wheelNumber);
    }
}
