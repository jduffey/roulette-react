import { useEffect, useState } from "react";

const CLASS_NAME = 'SpinButton-component';
export function SpinButton(props) {
    const [extraMessage, setExtraMessage] = useState('-');
    const [zIndex, setZIndex] = useState(-1);
    const [color, setColor] = useState('inherit');
    const [shouldDisplayExtraMessage, setShouldDisplayExtraMessage] = useState(false);

    useEffect(() => {
        setShouldDisplayExtraMessage(!props.hasABetBeenPlaced || props.wheelIsSpinning);
        setZIndex(shouldDisplayExtraMessage ? 1 : -1);
        setColor(shouldDisplayExtraMessage ? '#999999' : 'inherit');
        setExtraMessage(
            props.wheelIsSpinning
                ? 'SPINNING...'
                : 'PLACE A BET'
        );
    }, [shouldDisplayExtraMessage, props.hasABetBeenPlaced, props.wheelIsSpinning]);

    return (
        <div
            id="spin-button"
            className={CLASS_NAME}
            onClick={() => props.onClick()}
            role="button"
        >
            <span
                style={{
                    color,
                }}
            >
                SPIN
            </span>
            <span
                className="place-a-bet-message"
                style={{
                    zIndex,
                }}
            >
                {extraMessage}
            </span>
        </div>
    );
}
