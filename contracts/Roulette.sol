// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./RandomnessProvider.sol";
import "./MyGameToken.sol";

contract Roulette {
    RandomnessProvider private _randomnessProvider;
    MyGameToken private _gameToken;
    address private immutable _house;

    // Security constants
    uint256 public constant MAX_BETS_PER_SPIN = 20;
    uint256 public constant MIN_BET_AMOUNT = 0.01 ether; // 0.01 ETH = $0.01
    uint256 public constant MAX_BET_AMOUNT = 1000 ether; // 1000 ETH = $1000 (matches highest chip)
    
    // Reentrancy protection
    bool private _locked;

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
    event BetRemoved(address indexed player, uint256 betIndex, uint256 betAmount);
    event ExecutedWager(address indexed player, uint256 wheelNumber, uint256 totalWinnings, uint256 totalBetsReturned);
    event BetCleared(address indexed player);

    // Modifiers for security
    modifier nonReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    modifier onlyPlayer() {
        require(msg.sender != _house, "House cannot place bets");
        _;
    }

    constructor(address randomnessProviderAddress, address gameTokenAddress) {
        _randomnessProvider = RandomnessProvider(randomnessProviderAddress);
        _gameToken = MyGameToken(payable(gameTokenAddress));
        _house = msg.sender;
    }

    function placeBet(string memory betName, uint256 betAmount) public nonReentrant onlyPlayer {
        require(betAmount >= MIN_BET_AMOUNT, "Bet amount too low");
        require(betAmount <= MAX_BET_AMOUNT, "Bet amount too high");
        require(_pendingBets[msg.sender].length < MAX_BETS_PER_SPIN, "Too many bets");
        require(_gameToken.balanceOf(msg.sender) >= betAmount, "Insufficient token balance");
        require(_gameToken.allowance(msg.sender, address(this)) >= betAmount, "Insufficient allowance");
        require(_validateBetName(betName), "Invalid bet name");

        // Transfer tokens from player to contract
        require(_gameToken.transferFrom(msg.sender, address(this), betAmount), "Token transfer failed");

        _pendingBets[msg.sender].push(PendingBet(betName, betAmount));
        emit BetPlaced(msg.sender, betName, betAmount);
    }

    function removeBet(uint256 betIndex) public nonReentrant onlyPlayer {
        require(betIndex < _pendingBets[msg.sender].length, "Invalid bet index");
        require(_pendingBets[msg.sender].length > 0, "No bets to remove");
        
        uint256 betAmount = _pendingBets[msg.sender][betIndex].betAmount;
        
        // Remove the bet from array (swap with last element and pop)
        _pendingBets[msg.sender][betIndex] = _pendingBets[msg.sender][_pendingBets[msg.sender].length - 1];
        _pendingBets[msg.sender].pop();
        
        // Return tokens to player
        require(_gameToken.transfer(msg.sender, betAmount), "Token return failed");
        
        emit BetRemoved(msg.sender, betIndex, betAmount);
    }

    function clearBets() public nonReentrant onlyPlayer {
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

    function _getCompleteWheelSet() private pure returns (uint8[38] memory) {
        return [
            uint8(0), uint8(1), uint8(2), uint8(3), uint8(4), uint8(5), uint8(6), uint8(7), uint8(8), uint8(9),
            uint8(10), uint8(11), uint8(12), uint8(13), uint8(14), uint8(15), uint8(16), uint8(17), uint8(18), uint8(19),
            uint8(20), uint8(21), uint8(22), uint8(23), uint8(24), uint8(25), uint8(26), uint8(27), uint8(28), uint8(29),
            uint8(30), uint8(31), uint8(32), uint8(33), uint8(34), uint8(35), uint8(36), uint8(37)
        ];
    }

    /// @dev Adds a wheel number to the player's completion set and checks for completion
    /// @param addr The player's address
    /// @param wheelNumber The wheel number that was hit
    function _addToSet(address addr, uint256 wheelNumber) internal {
        if (!_playerNumberCompletionSets[addr].numberIsHit[wheelNumber]) {
            _playerNumberCompletionSets[addr].hitNumbers.push(wheelNumber);
            _playerNumberCompletionSets[addr].numberIsHit[wheelNumber] = true;
        }

        // check if set is complete and reset if so
        uint8[38] memory wheelSet = _getCompleteWheelSet();
        if (_playerNumberCompletionSets[addr].hitNumbers.length == wheelSet.length) {
            for (uint256 i = 0; i < wheelSet.length; i++) {
                _playerNumberCompletionSets[addr].numberIsHit[wheelSet[i]] = false;
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
        // Straight up bets (already implemented)
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_0")) && wheelNumber == 0) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_00")) && wheelNumber == 37) {
            return true;
        }
        
        // Numbers 1-36
        for (uint256 i = 1; i <= 36; i++) {
            string memory straightUpBet = string(abi.encodePacked("STRAIGHT_UP_", _uint2str(i)));
            if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked(straightUpBet)) && wheelNumber == i) {
                return true;
            }
        }
        
        // Outside bets
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("RED")) && _isRed(wheelNumber)) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("BLACK")) && _isBlack(wheelNumber)) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("EVEN")) && _isEven(wheelNumber)) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("ODD")) && _isOdd(wheelNumber)) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("FIRST_DOZEN")) && wheelNumber >= 1 && wheelNumber <= 12) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("SECOND_DOZEN")) && wheelNumber >= 13 && wheelNumber <= 24) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("THIRD_DOZEN")) && wheelNumber >= 25 && wheelNumber <= 36) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("FIRST_COLUMN")) && wheelNumber % 3 == 1 && wheelNumber != 0 && wheelNumber != 37) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("SECOND_COLUMN")) && wheelNumber % 3 == 2 && wheelNumber != 0 && wheelNumber != 37) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("THIRD_COLUMN")) && wheelNumber % 3 == 0 && wheelNumber != 0 && wheelNumber != 37) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("LOW_NUMBERS")) && wheelNumber >= 1 && wheelNumber <= 18) {
            return true;
        }
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("HIGH_NUMBERS")) && wheelNumber >= 19 && wheelNumber <= 36) {
            return true;
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
        
        // Outside bets
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("RED")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("BLACK")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("EVEN")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("ODD")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("LOW_NUMBERS")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("HIGH_NUMBERS"))) {
            return 1; // 1:1 payout
        }
        
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("FIRST_DOZEN")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("SECOND_DOZEN")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("THIRD_DOZEN"))) {
            return 2; // 2:1 payout
        }
        
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("FIRST_COLUMN")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("SECOND_COLUMN")) ||
            keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("THIRD_COLUMN"))) {
            return 2; // 2:1 payout
        }
        
        return 0;
    }

    // Helper functions
    function _isRed(uint256 wheelNumber) internal pure returns (bool) {
        if (wheelNumber == 0 || wheelNumber == 37) return false;
        uint8[18] memory redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
        for (uint256 i = 0; i < redNumbers.length; i++) {
            if (wheelNumber == redNumbers[i]) return true;
        }
        return false;
    }

    function _isBlack(uint256 wheelNumber) internal pure returns (bool) {
        if (wheelNumber == 0 || wheelNumber == 37) return false;
        return !_isRed(wheelNumber);
    }

    function _isEven(uint256 wheelNumber) internal pure returns (bool) {
        return wheelNumber != 0 && wheelNumber != 37 && wheelNumber % 2 == 0;
    }

    function _isOdd(uint256 wheelNumber) internal pure returns (bool) {
        return wheelNumber != 0 && wheelNumber != 37 && wheelNumber % 2 == 1;
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

    function _validateBetName(string memory betName) internal pure returns (bool) {
        bytes memory betNameBytes = bytes(betName);
        require(betNameBytes.length > 0, "Empty bet name");
        require(betNameBytes.length <= 50, "Bet name too long");
        
        // Check for valid bet types
        string[12] memory validBets = ["RED", "BLACK", "EVEN", "ODD", "FIRST_DOZEN", "SECOND_DOZEN", "THIRD_DOZEN", "FIRST_COLUMN", "SECOND_COLUMN", "THIRD_COLUMN", "LOW_NUMBERS", "HIGH_NUMBERS"];
        for (uint256 i = 0; i < validBets.length; i++) {
            if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked(validBets[i]))) {
                return true;
            }
        }
        
        // Check for straight up bets
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_0"))) return true;
        if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked("STRAIGHT_UP_00"))) return true;
        
        for (uint256 i = 1; i <= 36; i++) {
            string memory straightUpBet = string(abi.encodePacked("STRAIGHT_UP_", _uint2str(i)));
            if (keccak256(abi.encodePacked(betName)) == keccak256(abi.encodePacked(straightUpBet))) {
                return true;
            }
        }
        
        return false;
    }

    function placeMultipleBets(string[] memory betNames, uint256[] memory betAmounts) public nonReentrant onlyPlayer {
        require(betNames.length == betAmounts.length, "Array lengths must match");
        require(betNames.length > 0, "No bets provided");
        require(betNames.length <= 10, "Too many bets in batch");
        require(_pendingBets[msg.sender].length + betNames.length <= MAX_BETS_PER_SPIN, "Too many total bets");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < betAmounts.length; i++) {
            require(betAmounts[i] >= MIN_BET_AMOUNT, "Bet amount too low");
            require(betAmounts[i] <= MAX_BET_AMOUNT, "Bet amount too high");
            require(_validateBetName(betNames[i]), "Invalid bet name");
            totalAmount += betAmounts[i];
        }

        require(_gameToken.balanceOf(msg.sender) >= totalAmount, "Insufficient balance");
        require(_gameToken.allowance(msg.sender, address(this)) >= totalAmount, "Insufficient allowance");
        require(_gameToken.transferFrom(msg.sender, address(this), totalAmount), "Token transfer failed");

        for (uint256 i = 0; i < betNames.length; i++) {
            _pendingBets[msg.sender].push(PendingBet(betNames[i], betAmounts[i]));
            emit BetPlaced(msg.sender, betNames[i], betAmounts[i]);
        }
    }
}
