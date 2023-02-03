import { Link } from "react-router-dom";

export function NavigationBar() {
    return (
        <div className="NavigationBar-component">
            <div className="NavigationBar-component-title">
                <Link to="/">Home</Link>
                <Link to="/roulette">Roulette</Link>
                <Link to="/next-game">Next Game</Link>
            </div>
        </div>
    );
}