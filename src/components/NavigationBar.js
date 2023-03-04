import { Link } from "react-router-dom";

export function NavigationBar() {
    return (
        <div className="NavigationBar-component">
            <div className="NavigationBar-links">
                <Link to="/">Home</Link>
                <Link to="/roulette-p1">Roulette P1</Link>
                <Link to="/roulette-p2">Roulette P2</Link>
                <Link to="/roulette-p3">Roulette P3</Link>
                <Link to="/sic-bo">Sic Bo</Link>
                <Link to="/balances">Balances</Link>
                <Link to="/events">Events</Link>
            </div>
        </div>
    );
}
