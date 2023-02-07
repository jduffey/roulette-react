import { Board } from "./Board";
import { PlayerInfo } from "./PlayerInfo";

export function SicBo(props) {
    return (
        <>
            <Board />
            <PlayerInfo
                fooVar={props.fooVar}
                setFooVar={props.setFooVar}
            />
        </>
    );
}
