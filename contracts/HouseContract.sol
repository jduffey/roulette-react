// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract HouseContract {
    mapping(address => uint256) public balances;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event WagerResult(address indexed user, uint256 wager, bool win);

    // Allow users to deposit Ether into the contract
    function deposit() external payable {
        require(msg.value > 0, "Deposit must be greater than zero");
        _addBalance(msg.sender, msg.value);
    }

    // Private function to add balance and emit the deposit event
    function _addBalance(address user, uint256 amount) private {
        balances[user] += amount;
        emit Deposit(user, amount);
    }

    // Wager function to place bets
    // Wager function to place bets
    function wager(uint256 amount) external {
        require(amount > 0 && balances[msg.sender] >= amount, "Insufficient balance or zero amount");
        uint256 randomValue = random();
        bool win = (randomValue % 1000) < 490; // Adjusted for simplicity to simulate a 49% win rate

        if (win) {
            balances[msg.sender] += amount; // Add the wagered amount back to the user's balance if they win
            emit WagerResult(msg.sender, amount, true);
        } else {
            balances[msg.sender] -= amount; // Deduct the wagered amount from the user's balance if they lose
            emit WagerResult(msg.sender, amount, false);
        }
    }

    // Allow users to withdraw their balances
    function withdraw(uint256 amount) external {
        require(amount <= balances[msg.sender], "Insufficient funds");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    // Receive function to accept plain Ether deposits
    receive() external payable {
        _addBalance(msg.sender, msg.value);
    }

    // Fallback function in case any non-ETH data is sent to the contract
    fallback() external payable {
        _addBalance(msg.sender, msg.value);
    }

    // Function to generate a pseudo-random number based on block details
    function random() internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }
}
