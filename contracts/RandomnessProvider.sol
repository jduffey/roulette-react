// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract RandomnessProvider {
    function randomValue() external view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.difficulty)));
    }
}
