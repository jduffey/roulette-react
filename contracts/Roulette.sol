// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./RandomnessProvider.sol";
import "./MyGameToken.sol";

contract Roulette {
    RandomnessProvider private _randomnessProvider;
    MyGameToken private _gameToken;
    address private immutable _house;

    mapping(address => NumberCompletionSet) private _playerNumberCompletionSets;
    mapping(address => PendingBet[]) private _pendingBets;

    struct NumberCompletionSet {
        uint256[] hitNumbers;
        mapping(uint256 => bool) numberIsHit;
        uint256 completionCounter;
    }

    struct PendingBet {
        string betName;
        uint256 betAmount;
    }

    event BetPlaced(address indexed player, string betName, uint256 betAmount);
    event ExecutedWager(address indexed player, uint256 wheelNumber, uint256 totalWinnings, uint256 totalBetsReturned);
    event BetCleared(address indexed player);

    constructor(address randomnessProviderAddress, address gameTokenAddress) {
        _randomnessProvider = RandomnessProvider(randomnessProviderAddress);
        _gameToken = MyGameToken(payable(gameTokenAddress));
        _house = msg.sender;
    }

    function placeBet(string memory betName, uint256 betAmount) public {
        require(betAmount > 0, "Bet amount must be greater than 0");
        require(_gameToken.balanceOf(msg.sender) >= betAmount, "Insufficient token balance");
        require(_gameToken.allowance(msg.sender, address(this)) >= betAmount, "Insufficient allowance");

        // Transfer tokens from player to contract
        require(_gameToken.transferFrom(msg.sender, address(this), betAmount), "Token transfer failed");

        _pendingBets[msg.sender].push(PendingBet(betName, betAmount));
        emit BetPlaced(msg.sender, betName, betAmount);
    }

    function clearBets() public {
        uint256 totalBetAmount = 0;
        for (uint256 i = 0; i < _pendingBets[msg.sender].length; i++) {
            totalBetAmount += _pendingBets[msg.sender][i].betAmount;
        }

        if (totalBetAmount > 0) {
            // Return tokens to player
            require(_gameToken.transfer(msg.sender, totalBetAmount), "Token return failed");
        }

        delete _pendingBets[msg.sender];
        emit BetCleared(msg.sender);
    }

    function getPendingBets(address player) public view returns (PendingBet[] memory) {
        return _pendingBets[player];
    }

    function getTotalPendingBetAmount(address player) public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < _pendingBets[player].length; i++) {
            total += _pendingBets[player][i].betAmount;
        }
        return total;
    }

    /// @dev Complete set of roulette wheel numbers (0-36 + 00)
    uint8[38] private constant COMPLETE_WHEEL_SET = [
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

    /// @dev Adds a wheel number to the player's completion set and checks for completion
    /// @param addr The player's address
    /// @param wheelNumber The wheel number that was hit
    function _addToSet(address addr, uint256 wheelNumber) internal {
        if (!_playerNumberCompletionSets[addr].numberIsHit[wheelNumber]) {
            _playerNumberCompletionSets[addr].hitNumbers.push(wheelNumber);
            _playerNumberCompletionSets[addr].numberIsHit[wheelNumber] = true;
        }

        // check if set is complete and reset if so
        if (_playerNumberCompletionSets[addr].hitNumbers.length == COMPLETE_WHEEL_SET.length) {
            for (uint256 i = 0; i < COMPLETE_WHEEL_SET.length; i++) {
                _playerNumberCompletionSets[addr].numberIsHit[COMPLETE_WHEEL_SET[i]] = false;
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
        require(_pendingBets[player].length > 0, "No pending bets");
        
        uint256 randValue = _randomnessProvider.randomValue();
        uint256 wheelNumber = randValue % 38;

        // Calculate winnings based on pending bets
        uint256 totalWinnings = 0;
        uint256 totalBetsReturned = 0;
        uint256 totalStake = 0;
        
        for (uint256 i = 0; i < _pendingBets[player].length; i++) {
            PendingBet memory bet = _pendingBets[player][i];
            bool didBetWin = _checkBetWin(bet.betName, wheelNumber);
            
            if (didBetWin) {
                uint256 multiplier = _getBetMultiplier(bet.betName);
                totalWinnings += bet.betAmount * multiplier;
                totalBetsReturned += bet.betAmount;
            }
            totalStake += bet.betAmount;
        }

        // Transfer winnings and returned bets to player
        uint256 totalPayout = totalWinnings + totalBetsReturned;
        if (totalPayout > 0) {
            require(_gameToken.transfer(player, totalPayout), "Winnings transfer failed");
        }

        // Transfer house share (losing bets) to house address
        uint256 houseShare = totalStake - totalBetsReturned;
        if (houseShare > 0) {
            require(_gameToken.transfer(_house, houseShare), "House transfer failed");
        }

        _addToSet(player, wheelNumber);
        delete _pendingBets[player];
        
        emit ExecutedWager(player, wheelNumber, totalWinnings, totalBetsReturned);
    }

    function _checkBetWin(string memory betName, uint256 wheelNumber) internal pure returns (bool) {
        // This is a simplified version - you'd need to implement the full roulette logic
        // For now, just check straight up bets
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_0")) && wheelNumber == 0) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_00")) && wheelNumber == 37) {
            return true;
        }
        
        // Check numbers 1-36
        for (uint256 i = 1; i <= 36; i++) {
            string memory straightUpBet = string(abi.encodePacked("STRAIGHT_UP_", _uint2str(i)));
            if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked(straightUpBet)) && wheelNumber == i) {
                return true;
            }
        }
        
        return false;
    }

    function _getBetMultiplier(string memory betName) internal pure returns (uint256) {
        // Straight up bets pay 35:1
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_0")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_00"))) {
            return 35;
        }
        
        // Check if it's a straight up bet for numbers 1-36
        for (uint256 i = 1; i <= 36; i++) {
            string memory straightUpBet = string(abi.encodePacked("STRAIGHT_UP_", _uint2str(i)));
            if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked(straightUpBet))) {
                return 35;
            }
        }
        
        return 0;
    }

    function _uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            k -= 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
