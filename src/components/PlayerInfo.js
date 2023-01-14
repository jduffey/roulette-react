export function PlayerInfo(props) {
    return (
        <div className="player-info">
            {"Balance"}
            <br />
            {"$ " + props.playerBalance.toLocaleString()}
            <br />
            {"Total Bet"}
            <br />
            {"$ " + props.totalBetAmount.toLocaleString()}
        </div>
    );
}
