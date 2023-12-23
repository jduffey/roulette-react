import { NewHomeGameSelectionBox } from "./NewHomeGameSelectionBox";

export const Home = () => {
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: '1200px',
        gap: '20px',
        // outline: '1px solid red'
    };

    return (
        <div style={containerStyle}>
            {
                [
                    ['Chuck-A-Luck', 'https://placehold.co/220x140', '/chuck-a-luck'],
                    ['Three Card Poker', 'https://placehold.co/220x140', '/three-card-poker'],
                    ['Roulette', 'https://placehold.co/220x140', '/roulette'],
                    ['Sic Bo', 'https://placehold.co/220x140', '/sic-bo'],
                    ['Blackjack', 'https://placehold.co/220x140', '/blackjack'],
                    ['Baccarat', 'https://placehold.co/220x140', '/baccarat'],
                    ['Keno', 'https://placehold.co/220x140', '/keno'],
                    ['Space Poker', 'https://placehold.co/220x140', '/space-poker'],
                    ['Diamond Miner', 'https://placehold.co/220x140', '/diamond-miner'],
                    ['Gift Tree', 'https://placehold.co/220x140', '/gift-tree'],
                    ['Coin Flip', 'https://placehold.co/220x140', '/coin-flip'],
                ].map(([gameName, gameImageUrl, linkTo]) => (
                    <NewHomeGameSelectionBox
                        key={gameName}
                        gameName={gameName}
                        gameImageUrl={gameImageUrl}
                        linkTo={linkTo}
                    />
                ))
            }
        </div>
    );
}
