export function BetsOnBoard(props) {
    return (
        <div className="betting-history">
            <div className="status-message">
                {"Bets on Board"}
            </div>
            <ol>
                {props.buttons}
            </ol>
        </div>
    );
}
