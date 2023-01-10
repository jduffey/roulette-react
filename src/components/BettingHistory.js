export function BettingHistory(props) {
    return (
        <div className="betting-history">
            <div className="status-message">
                {"Betting History"}
            </div>
            <ol>
                {props.buttons}
            </ol>
        </div>
    );
}
