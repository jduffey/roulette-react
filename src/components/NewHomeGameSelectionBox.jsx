import React, { useState } from 'react';
import { Link } from "react-router-dom";

export const NewHomeGameSelectionBox = ({
    gameName,
    gameImageUrl,
    linkTo,
}) => {
    const [hover, setHover] = useState(false);

    const isDisabled = typeof linkTo === 'undefined';

    const boxBackgroundColor =
        isDisabled ?
            'grey' :
            hover
                ? '#FDFD96'
                : 'white';

    const boxStyle = {
        width: 256,
        height: 252,
        position: 'relative',
        backgroundColor: boxBackgroundColor,
        borderRadius: 16,
        border: '4px black solid',
        boxShadow: '4px 6px 0px 0px #000000',
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? 'none' : 'auto',
        cursor: isDisabled ? 'default' : 'pointer',
        // outline: '1px solid red',
    };

    const textStyle = {
        width: 256,
        height: 40,
        position: 'absolute',
        bottom: 30,
        textAlign: 'center',
        color: 'black',
        fontSize: hover ? '18px' : '16px',
        fontFamily: 'Lexend Mega',
        fontWeight: '700',
        wordWrap: 'break-word',
        lineHeight: '40px',
        // outline: '1px solid red',
    };

    return (
        <Link to={linkTo}>
            <div
                style={boxStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <img
                    style={{
                        width: 220,
                        height: 140,
                        position: 'absolute',
                        left: 14,
                        top: 14,
                        borderRadius: 12,
                        border: '4px black solid',
                    }}
                    src={gameImageUrl}
                    alt={`placeholder for ${gameName}`}
                />
                <div style={textStyle}>
                    {gameName}
                </div>
            </div>
        </Link>
    );
};
