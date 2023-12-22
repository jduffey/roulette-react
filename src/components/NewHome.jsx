import { NewHomeGameSelectionBox } from "./NewHomeGameSelectionBox";

export const NewHome = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}
            >
                {
                    [
                        ['Chuck-A-Luck', 'https://via.placeholder.com/211x137'],
                        ['Three Card Poker', 'https://via.placeholder.com/211x137'],
                        ['Roulette', 'https://via.placeholder.com/211x137'],
                        ['Sic Bo', 'https://via.placeholder.com/211x137', true]
                    ].map(([gameName, gameImageUrl, disbaled]) => (
                        <NewHomeGameSelectionBox
                            key={gameName}
                            gameName={gameName}
                            gameImageUrl={gameImageUrl}
                            disabled={disbaled}
                        />
                    ))
                }
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}
            >
                {
                    [
                        ['Blackjack', 'https://via.placeholder.com/211x137'],
                        ['Baccarat', 'https://via.placeholder.com/211x137'],
                        ['Craps', 'https://via.placeholder.com/211x137'],
                        ['Keno', 'https://via.placeholder.com/211x137', true]
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}
            >
                {
                    [
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
        </>
    );
}
