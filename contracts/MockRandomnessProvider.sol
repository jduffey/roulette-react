// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IRandomnessProvider} from "./IRandomnessProvider.sol";

contract MockRandomnessProvider is IRandomnessProvider {
    uint256 private _fakeRandomValue;

    function randomValue(address caller) external view returns (uint256) {
        return _fakeRandomValue;
    }

    function setFakeRandomValue(uint256 fakeRandomValue) public {
        _fakeRandomValue = fakeRandomValue;
    }
}
