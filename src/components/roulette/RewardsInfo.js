const CLASS_NAME = "RewardsInfo-component";
export function RewardsInfo(props) {
    const gamesWon = props.transactionHistory.filter(tx => tx.finalBalance > tx.startingBalance).length;
    const gamesLost = props.transactionHistory.filter(tx => tx.finalBalance < tx.startingBalance).length;
    const gamesTied = props.transactionHistory.filter(tx => tx.finalBalance === tx.startingBalance).length;

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                Games Won
                <br />
                {gamesWon}
            </div>
            <div>
                Games Lost
                <br />
                {gamesLost}
            </div>
            <div>
                Games Tied
                <br />
                {gamesTied}
            </div>
        </div >
    )
}
