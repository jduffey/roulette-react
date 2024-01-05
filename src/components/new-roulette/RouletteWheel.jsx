import { useState } from 'react';

const RouletteWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const segments = Array.from({ length: 2 }, (_, i) => i + 1);

    const startSpinning = () => {
        setSpinning(true);
        setTimeout(() => setSpinning(false), 5000);
    };

    return (
        <div>
            <div className={`wheel ${spinning ? 'spin' : ''}`}>
                {segments.map((number, index) => (
                    <div
                        key={index}
                        className={`segment ${index % 2 === 0 ? 'red' : 'black'}`}
                        style={{
                            transform: `rotate(${180 * index}deg)`,
                            zIndex: index,
                        }}
                    >
                        <div className="number">{number}</div>
                    </div>
                ))}
            </div>
            <button onClick={startSpinning}>Spin</button>
        </div>
    );
};

export default RouletteWheel;
