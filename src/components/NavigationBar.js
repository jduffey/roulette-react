import { Link } from "react-router-dom";

export function NavigationBar() {
    return (
        <div className="NavigationBar-component">
            <div className="NavigationBar-links">
                <Link to="/">Home</Link>
                <Link to="/roulette">Roulette</Link>
                <Link to="/sic-bo">Sic Bo</Link>
                <Link to="/balances">Balances</Link>
            </div>
        </div>
    );
}
