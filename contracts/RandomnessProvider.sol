// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IRandomnessProvider} from "./IRandomnessProvider.sol";

contract RandomnessProvider is IRandomnessProvider {
    // event RandomnessGenerated(address calledBy, uint256 randomValue);

    function randomValue() external view returns (uint256) {
        uint256 randVal = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.difficulty)));
        // emit RandomnessGenerated(randVal);
        return randVal;
    }
}
