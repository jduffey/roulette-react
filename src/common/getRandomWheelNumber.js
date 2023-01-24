import { WHEEL_NUMBERS } from "./wheelNumbers";

export const getRandomWheelNumber = () => {
    const randomIndex = Math.floor(Math.random() * Object.keys(WHEEL_NUMBERS).length);

    return WHEEL_NUMBERS[Object.keys(WHEEL_NUMBERS)[randomIndex]];
}
