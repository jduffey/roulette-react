import RouletteWheel from './RouletteWheel.jsx';
import './RouletteWheel.css';

export function NewRoulette() {
    return (
        <div
            style={{
                width: 1440,
                height: 1024,
                outline: '1px solid red',
            }}
        >
            NEW ROULETTE
            <RouletteWheel />
        </div>
    );
}