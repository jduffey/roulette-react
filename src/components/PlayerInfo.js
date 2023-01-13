export function PlayerInfo(props) {
    return (
        <div className="player-info">
            {"Player Info"}
            <br />
            <br />
            {"Bal: $" + props.playerBalance}
            <br />
            {"Bet: $" + props.totalBetAmount}
        </div>
    );
}
