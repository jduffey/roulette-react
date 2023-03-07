import { STANDARD_COLORS } from "./standardColors";

export const getWheelNumberColor = (wheelNumber) => {
    switch (wheelNumber) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 9:
        case 12:
        case 14:
        case 16:
        case 18:
        case 19:
        case 21:
        case 23:
        case 25:
        case 27:
        case 30:
        case 32:
        case 34:
        case 36:
            return STANDARD_COLORS.FELT_RED;

        case 2:
        case 4:
        case 6:
        case 8:
        case 10:
        case 11:
        case 13:
        case 15:
        case 17:
        case 20:
        case 22:
        case 24:
        case 26:
        case 28:
        case 29:
        case 31:
        case 33:
        case 35:
            return STANDARD_COLORS.FELT_BLACK;

        case 0:
        case 37:
            return STANDARD_COLORS.FELT_GREEN;

        default:
            throw new Error(`Unknown wheel number: ${wheelNumber}`);
    }
}
