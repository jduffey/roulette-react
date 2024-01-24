import { Link } from "react-router-dom";

export function NavigationBar() {
    return (
        <div className="NavigationBar-component">
            <div className="NavigationBar-links">
                <Link to="/">Home</Link>
                <Link to="/balances">Balances</Link>
                <Link to="/payout-schedule-helper">Payout Schedule Helper</Link>
            </div>
        </div>
    );
}
