import { useState } from 'react';

const RouletteWheel = () => {
    const [rotation, setRotation] = useState(0);
    const [winningNumber, setWinningNumber] = useState(null);
    const numberOfSegments = 38;

    const rouletteNumbers = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, 37, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2];

    const startSpinning = () => {
        const randomIndex = Math.floor(Math.random() * numberOfSegments);
        // const randomIndex = 1;
        console.log('randomIndex', randomIndex);
        const degreesPerSegment = 360 / numberOfSegments;
        // console.log('degreesPerSegment', degreesPerSegment);
        const extraSpins = 0;
        const finalRotation = extraSpins * 360 + (randomIndex * degreesPerSegment);
        console.log('finalRotation', finalRotation);

        setRotation(prev => (prev + finalRotation) % 360);

        setTimeout(() => {
            const winningNumber = rouletteNumbers[rouletteNumbers.length - randomIndex];
            console.log('winningNumber', winningNumber);
            setWinningNumber(winningNumber);
        }, 3000);
    };

    const displayNumber = (value) => {
        if (value === 0) return '0';
        if (value === 37) return '00';
        return value;
    }

    const displayColor = (value) => {
        if (value === 0 || value === 37) return 'green';

        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

        return redNumbers.includes(value) ? 'red' : 'black';
    };

    const clipPathCompensation = 3.8;
    const clipPath = `polygon(50% 100%, ${50 - clipPathCompensation}% 0%, ${50 + clipPathCompensation}% 0%)`;

    return (
        <div>
            <div className="arrow"></div>
            <div className={`wheel`} style={{ transform: `rotate(${rotation}deg)` }}>
                {rouletteNumbers.map((number, index) => (
                    <div
                        key={index}
                        className={`segment ${displayColor(number)}`}
                        style={{
                            transform: `rotate(${360 / numberOfSegments * index}deg) translate(0%, 0%)`,
                            zIndex: index,
                            clipPath,
                        }}
                    >
                        <div className={`number ${displayColor(number)}`}>
                            {displayNumber(number)}
                        </div>
                    </div>
                ))}
                <div className="inner-larger-circle"></div>
                <div className="inner-smaller-circle" >
                </div>
            </div>
            <div className='button-container'>
                <button onClick={startSpinning} >SPIN</button>
            </div>
            {winningNumber !== null && (
                <div className="winning-number-display">
                    Winning Number: {winningNumber}
                </div>
            )}
        </div>
    );
};

export default RouletteWheel;
