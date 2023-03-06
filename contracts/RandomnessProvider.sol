// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract RandomnessProvider {
    event RandomnessGenerated(address calledBy, uint256 randomValue);

    function randomValue(address caller) external returns (uint256) {
        uint256 randVal = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.difficulty, caller)));
        emit RandomnessGenerated(caller, randVal);
        return randVal;
    }
}
