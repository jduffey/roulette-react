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
                    ['Chuck-A-Luck', 'https://placehold.co/220x140'],
                    ['Three Card Poker', 'https://placehold.co/220x140'],
                    ['Roulette', 'https://placehold.co/220x140'],
                    ['Sic Bo', 'https://placehold.co/220x140', true],
                    ['Blackjack', 'https://placehold.co/220x140'],
                    ['Baccarat', 'https://placehold.co/220x140'],
                    ['Keno', 'https://placehold.co/220x140', true],
                    ['Space Poker', 'https://placehold.co/220x140'],
                    ['Diamond Miner', 'https://placehold.co/220x140', true],
                    ['Gift Tree', 'https://placehold.co/220x140', true],
                    ['Coin Flip', 'https://placehold.co/220x140', true]
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
