import { Link } from "react-router-dom";

export function NavigationBar() {
    return (
        <div className="NavigationBar-component">
            <div className="NavigationBar-component-title">
                <Link to="/roulette">Roulette</Link>
            </div>
        </div>
    );
}