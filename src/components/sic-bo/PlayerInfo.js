import React from 'react';

const CLASS_NAME = "SicBo-PlayerInfo-component";
export function PlayerInfo(props) {
    const totalBetsOnBoard = 1234;

    const localSetFooVar = (newFooVar) => {
        props.setFooVar(newFooVar);
    };

    localSetFooVar("New foo var value");

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"Avail. Balance"}
                < br />
                {props.fooVar}
            </div>
            <div>
                {"Total Bet"}
                < br />
                {totalBetsOnBoard}
            </div>
        </div >
    )
}
