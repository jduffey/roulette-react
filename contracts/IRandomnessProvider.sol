// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRandomnessProvider {
    function randomValue() external view returns (uint256);
}
