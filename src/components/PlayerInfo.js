export function PlayerInfo(props) {
    return (
        <div className="player-info">
            <div className="status-message">
                {"Player Info"}
            </div>
            <div>
                {"Bal: $" + props.playerBalance}
                <br />
                {"Bet: $" + props.totalBetAmount}
            </div>
        </div>
    );
}
