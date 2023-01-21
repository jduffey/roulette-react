export const getWheelNumberColor = (wheelNumber) => {
    const redNumbers = new Set(["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"]);
    const blackNumbers = new Set(["2", "4", "6", "8", "10", "11", "13", "15", "17", "20", "22", "24", "26", "28", "29", "31", "33", "35"]);
    const greenNumbers = new Set(["0", "00"]);
    if (redNumbers.has(wheelNumber)) {
        return "#d94848";
    } else if (blackNumbers.has(wheelNumber)) {
        return "#222222";
    } else if (greenNumbers.has(wheelNumber)) {
        return "#016D29";
    }
}
