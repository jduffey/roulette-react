import { useState } from 'react';

const RouletteWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const numberOfSegments = 38;
    const segments = Array.from({ length: numberOfSegments }, (_, i) => i + 1);

    const startSpinning = () => {
        setSpinning(true);
        setTimeout(() => setSpinning(false), 5000);
    };

    const displayNumber = (value) => {
        if (value === 37) return '00';
        if (value === 38) return '0';
        return value;
    }

    const displayColor = (value) => {
        if (value === 37 || value === 38) return 'green';
        if (value % 2 === 0) return 'red';
        return 'black';
    }

    return (
        <div>
            <div className={`wheel ${spinning ? 'spin' : ''}`}>
                {segments.map((number, index) => (
                    <div
                        key={index}
                        className={`segment ${displayColor(number)}`}
                        style={{
                            transform: `rotate(${360 / numberOfSegments * index}deg) translate(0%, 0%)`,
                            zIndex: index,
                            clipPath: `polygon(50% 100%, 46% 0%, 54% 0%)`
                        }}
                    >
                        <div className="number">
                            {
                                displayNumber(number)
                            }
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={startSpinning}>Spin</button>
        </div>
    );
};

export default RouletteWheel;
