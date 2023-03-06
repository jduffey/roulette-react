// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRandomnessProvider {
    function randomValue(address caller) external returns (uint256);
}
