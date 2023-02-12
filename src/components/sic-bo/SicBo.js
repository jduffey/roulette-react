import { Board } from "./Board";
import { PlayerInfo } from "./PlayerInfo";

// import { BET_NAMES } from "./sicBoBetNames";

export function SicBo() {
    function handleBetClick(betName) {
        console.log(betName);
    }

    return (
        <>
            <Board
                onClick={(betName) => handleBetClick(betName)}
            />
            <PlayerInfo />
        </>
    );
}
