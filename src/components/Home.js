import { GameSelectionBox } from "./GameSelectionBox";

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
                    ['Roulette', 'https://placehold.co/220x140', '/roulette'],
                    ['New Roulette', 'https://placehold.co/220x140', '/new-roulette'],
                    ['Sic Bo', 'https://placehold.co/220x140', '/sic-bo'],
                    ['Three Card Poker', 'https://placehold.co/220x140', '/three-card-poker'],
                    ['Chuck-A-Luck', 'https://placehold.co/220x140', '/chuck-a-luck'],
                    ['Blackjack', 'https://placehold.co/220x140', '/blackjack'],
                    ['Big Six', 'https://placehold.co/220x140', '/big-six'],
                    ['Keno', 'https://placehold.co/220x140', '/keno'],
                    ['Basic Slots', 'https://placehold.co/220x140', '/basic-slots'],
                    ['Advanced Slots', 'https://placehold.co/220x140', '/advanced-slots'],
                    ['Baccarat', 'https://placehold.co/220x140', '/baccarat'],
                    ['Space Poker', 'https://placehold.co/220x140', '/space-poker'],
                    ['Diamond Miner', 'https://placehold.co/220x140', '/diamond-miner'],
                    ['Gift Tree', 'https://placehold.co/220x140', '/gift-tree'],
                    ['Coin Flip', 'https://placehold.co/220x140', '/coin-flip'],
                ].map(([gameName, gameImageUrl, linkTo]) => (
                    <GameSelectionBox
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
