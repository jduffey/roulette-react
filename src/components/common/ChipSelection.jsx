import Chip1 from './chip-1.svg';
import Chip5 from './chip-5.svg';
import Chip10 from './chip-10.svg';
import Chip50 from './chip-50.svg';
import Chip100 from './chip-100.svg';
import Chip500 from './chip-500.svg';

function ChipSelection() {
    return (
        <>
            <div style={{
                width: '798px',
                height: '142px',
                background: '#CEFDCE',
                borderRadius: 20,
                border: '6px black solid',
            }} />
            <div>
                <img src={Chip1} alt='chip-1' />
                <img src={Chip5} alt='chip-5' />
                <img src={Chip10} alt='chip-10' />
                <img src={Chip50} alt='chip-50' />
                <img src={Chip100} alt='chip-100' />
                <img src={Chip500} alt='chip-500' />
            </div>
        </>
    );
}

export default ChipSelection;
