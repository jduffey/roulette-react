import { NewHomeGameSelectionBox } from "./NewHomeGameSelectionBox";

export const NewHome = () => {
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: '1200px',
        gap: '20px',
        outline: '1px solid red'
    };

    return (
        <div style={containerStyle}>
            {
                [
                    ['Chuck-A-Luck', 'https://via.placeholder.com/211x137'],
                    ['Three Card Poker', 'https://via.placeholder.com/211x137'],
                    ['Roulette', 'https://via.placeholder.com/211x137'],
                    ['Sic Bo', 'https://via.placeholder.com/211x137', true],
                    ['Blackjack', 'https://via.placeholder.com/211x137'],
                    ['Baccarat', 'https://via.placeholder.com/211x137'],
                    ['Keno', 'https://via.placeholder.com/211x137', true],
                    ['Space Poker', 'https://via.placeholder.com/211x137'],
                    ['Diamond Miner', 'https://via.placeholder.com/211x137', true],
                    ['Gift Tree', 'https://via.placeholder.com/211x137', true],
                    ['Coin Flip', 'https://via.placeholder.com/211x137', true]
                ].map(([gameName, gameImageUrl, disabled]) => (
                    <NewHomeGameSelectionBox
                        key={gameName}
                        gameName={gameName}
                        gameImageUrl={gameImageUrl}
                        disabled={disabled}
                    />
                ))
            }
        </div>
    );
}
