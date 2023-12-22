export const NewHomeGameSelectionBox = ({
    gameName,
    gameImageUrl
}) => {
    return (
        <div style={{
            width: 250.33,
            height: 247.42,
            position: 'relative',
            background: 'white',
            borderRadius: 15,
            border: '4px black solid',
            boxShadow: '4px 6px 0px 0px #000000'
        }}
        >
            <img
                style={{
                    width: 210.66,
                    height: 136.56,
                    position: 'absolute',
                    left: 20.52,
                    top: 21.63,
                    borderRadius: 10,
                    border: '4px black solid',
                }}
                src={gameImageUrl}
                alt={`placeholder for ${gameName}`}
            />
            <div style={{
                width: 210.66,
                height: 40.56,
                position: 'absolute',
                left: 20,
                top: 188,
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontFamily: 'Lexend Mega',
                fontWeight: '700',
                wordWrap: 'break-word'
            }}
            >
                {gameName}
            </div>
        </div>
    )
}