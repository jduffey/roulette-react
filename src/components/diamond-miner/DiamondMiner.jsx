import React, { useEffect, useState } from 'react';
import Diamond from './diamond.svg';

const DiamondMiner = () => {
    const [hoveredDiamond, setHoveredDiamond] = useState(null);
    const [diamondColors, setDiamondColors] = useState([]);

    useEffect(() => {
        const colors = Array.from({ length: 9 }, getRandomDirtColor);
        setDiamondColors(colors);
    }, []);

    const getRandomDirtColor = () => {
        const dirtColors = [
            '#795548', '#8B4513', '#A0522D', '#A52A2A', '#D2B48C',
            '#DEB887', '#F4A460', '#8B4513', '#654321', '#5E2605'
        ];
        const randomIndex = Math.floor(Math.random() * dirtColors.length);
        return dirtColors[randomIndex];
    };

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
        background: isHovered ? 'inherit' : getRandomDirtColor(),
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
                {[0, 1, 2].map(rowIndex => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {[0, 1, 2].map(columnIndex => {
                            const index = rowIndex * 3 + columnIndex;
                            return (
                                <div
                                    key={index}
                                    style={{ ...diamondStyle(hoveredDiamond === index), background: diamondColors[index] || 'black' }}
                                    onMouseOver={() => setHoveredDiamond(index)}
                                    onMouseOut={() => setHoveredDiamond(null)}
                                >
                                    <img
                                        style
                                        ={hoveredDiamond === index ? hoverStyle : imageStyle}
                                        src={Diamond}
                                        alt={`diamond - ${index}`} />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

// function getRandomDirtColor() {
//     const dirtColors = [
//         '#795548', // Brown
//         '#8B4513', // Saddle Brown
//         '#A0522D', // Sienna
//         '#A52A2A', // Brown
//         '#D2B48C', // Tan
//         '#DEB887', // Burlywood
//         '#F4A460', // Sandy Brown
//         '#8B4513', // Darker Saddle Brown
//         '#654321', // Dark Brown
//         '#5E2605'  // Deep Brown
//     ];

//     const randomIndex = Math.floor(Math.random() * dirtColors.length);
//     return dirtColors[randomIndex];
// }

export default DiamondMiner;