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
                <NewHomeGameSelectionBox
                    gameName="Chuck-A-Luck"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
                <NewHomeGameSelectionBox
                    gameName="Three Card Poker"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
                <NewHomeGameSelectionBox
                    gameName="Roulette"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
                <NewHomeGameSelectionBox
                    gameName="Sic Bo"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}
            >
                <NewHomeGameSelectionBox
                    gameName="Blackjack"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
                <NewHomeGameSelectionBox
                    gameName="Baccarat"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
                <NewHomeGameSelectionBox
                    gameName="Craps"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
                <NewHomeGameSelectionBox
                    gameName="Keno"
                    gameImageUrl="https://via.placeholder.com/211x137"
                />
            </div>
        </>
    );
}
