export function BettingHistory(props) {
    return (
        <div>
            <div className="status-message">
                {props.statusMessage}
            </div>
            <ol>
                {props.buttons}
            </ol>
        </div>
    );
}
