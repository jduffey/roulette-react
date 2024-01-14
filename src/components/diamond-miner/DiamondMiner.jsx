import Diamond from './diamond.svg';

const DiamondMiner = () => {
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

    const parentStyle = {
        width: '1440px',
        height: '1024px',
        outline: '1px solid red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={parentStyle}        >
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

export default DiamondMiner;