export function PlayerInfo(props) {
    return (
        <div className="player-info">
            {"Balance"}
            <br />
            {"$ " + props.playerBalance}
            <br />
            {"Total Bet"}
            <br />
            {"$ " + props.totalBetAmount}
        </div>
    );
}
