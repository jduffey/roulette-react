import React, { useState } from 'react';
import Diamond from './diamond.svg';

const DiamondMiner = () => {
    const [hoveredDiamond, setHoveredDiamond] = useState(null);

    const diamondContainerStyle = {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '12px',
        border: '6px black solid',
        borderRadius: '20px',
    };

    const diamondStyle = (isHovered) => ({
        margin: '12px',
        border: '6px solid black',
        borderRadius: '20px',
        padding: '16px',
        background: isHovered ? 'inherit' : 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    });

    const imageStyle = {
        visibility: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
    };

    const hoverStyle = {
        visibility: 'visible',
    };

    const parentStyle = {
        width: '1440px',
        height: '1024px',
        outline: '1px solid red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={parentStyle}>
            <div style={diamondContainerStyle}>
                {[0, 1, 2].map(index => (
                    <div
                        key={index}
                        style={diamondStyle(hoveredDiamond === index)}
                        onMouseOver={() => setHoveredDiamond(index)}
                        onMouseOut={() => setHoveredDiamond(null)}
                    >
                        <img
                            style={hoveredDiamond === index ? hoverStyle : imageStyle}
                            src={Diamond}
                            alt={`diamond-${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiamondMiner;