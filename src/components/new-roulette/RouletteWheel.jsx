import { useState } from 'react';

const RouletteWheel = () => {
    const [spinning, setSpinning] = useState(false);

    const rouletteNumbers = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, 37, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2];

    const startSpinning = () => {
        setSpinning(true);
        setTimeout(() => setSpinning(false), 5000);
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

    const clipPathCompensation = 4.147;
    const clipPath = `polygon(50% 100%, ${50 - clipPathCompensation}% 0%, ${50 + clipPathCompensation}% 0%)`;

    return (
        <div>
            <div className={`wheel ${spinning ? 'spin' : ''}`}>
                {rouletteNumbers.map((number, index) => (
                    <div
                        key={index}
                        className={`segment ${displayColor(number)}`}
                        style={{
                            transform: `rotate(${360 / rouletteNumbers.length * index}deg) translate(0%, 0%)`,
                            zIndex: index,
                            clipPath,
                        }}
                    >
                        <div className="number">
                            {displayNumber(number)}
                        </div>
                    </div>
                ))}
            </div>
            <button
                style={{
                    width: '800px',
                    height: '100px',
                }}
                onClick={startSpinning}>Spin</button>
        </div>
    );
};

export default RouletteWheel;
