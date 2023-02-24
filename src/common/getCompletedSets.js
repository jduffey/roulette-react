import { WHEEL_NUMBERS } from "./wheelNumbers";

const SET_OF_ALL_POSSIBLE_SPIN_RESULTS = new Set(Object.values(WHEEL_NUMBERS));

export function getCompletedSets(spins) {
    let completedSets = 0;

    const spinResults = spins.map(spin => spin.spinResult);

    // iterate through the array of spins and add them into a set
    // if the set is the same size as the set of all possible spin results
    // then increment the completed sets counter and clear the set
    // otherwise, continue adding to the set
    const spinResultsSet = new Set();
    for (let i = 0; i < spinResults.length; i++) {
        const spinResult = spinResults[i];
        spinResultsSet.add(spinResult);
        if (spinResultsSet.size === SET_OF_ALL_POSSIBLE_SPIN_RESULTS.size) {
            completedSets++;
            spinResultsSet.clear();
        }
    }

    return completedSets;
}