const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    const playerBalanceText = props.playerBalance
        ? parseFloat(props.playerBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : "Loading...";

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                Player Balance
                < br />
                {playerBalanceText}
            </div>
            <div>
                Total Bet
                < br />
                {props.totalBetAmount.toLocaleString()}
            </div>
        </div >
    )
}
