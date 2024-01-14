import Chip1 from './chip-1.svg';
import Chip5 from './chip-5.svg';
import Chip10 from './chip-10.svg';
import Chip50 from './chip-50.svg';
import Chip100 from './chip-100.svg';
import Chip500 from './chip-500.svg';

import Diamond from './diamond.svg';

function ChipSelection() {
    const chips = [Chip1, Chip5, Chip10, Chip50, Chip100, Chip500];

    const chipContainerStyle = {
        width: '798px',
        height: '142px',
        background: '#CEFDCE',
        borderRadius: '20px',
        border: '6px black solid',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px 0 16px',
    };

    const diamondContainerStyle = {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '12px',
        border: '6px black solid',
        borderRadius: '20px',
    };

    const diamondStyle = {
        margin: '12px',
        border: '6px solid black',
        borderRadius: '20px',
        padding: '16px',
    };

    return (
        <div>
            <div style={chipContainerStyle}>
                {chips.map((chip, index) => (
                    <img key={index} src={chip} alt={`chip-${index + 1}`} />
                ))}
            </div>
            <div style={diamondContainerStyle}>
                <div>
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                </div>
                <div>
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                </div>
                <div>
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                    <img style={diamondStyle} src={Diamond} alt="diamond" />
                </div>
            </div>
        </div>
    );
}

export default ChipSelection;
