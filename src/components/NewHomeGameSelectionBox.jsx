import React, { useState } from 'react';

export const NewHomeGameSelectionBox = ({
    gameName,
    gameImageUrl,
    disabled = false
}) => {
    const [hover, setHover] = useState(false);

    const boxStyle = {
        width: 250.33,
        height: 247.42,
        position: 'relative',
        background: disabled ? 'grey' : 'white',
        borderRadius: 15,
        border: '4px black solid',
        boxShadow: '4px 6px 0px 0px #000000',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'default' : 'pointer'
    };

    const textStyle = {
        width: 210.66,
        height: 40.56,
        position: 'absolute',
        left: 20,
        top: 188,
        textAlign: 'center',
        color: 'black',
        fontSize: hover ? '18px' : '16px',
        fontFamily: 'Lexend Mega',
        fontWeight: '700',
        wordWrap: 'break-word'
    };

    return (
        <div
            style={boxStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                style={{
                    width: 210.66,
                    height: 136.56,
                    position: 'absolute',
                    left: 20.52,
                    top: 21.63,
                    borderRadius: 10,
                    border: '4px black solid',
                }}
                src={gameImageUrl}
                alt={`placeholder for ${gameName}`}
            />
            <div style={textStyle}>
                {gameName}
            </div>
        </div>
    );
};
