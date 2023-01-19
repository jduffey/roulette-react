export function BetResultsInfo(props) {
    console.log("");
    Object.keys(props.betsOnBoard).forEach((betOption) => {
        console.log(betOption, ":", props.betsOnBoard[betOption]);
    });
    const className = "bet-results-info";
    return (
        <div className={className}>
            <table className="bet-results-info-table">
                <tbody>
                    <tr style={{
                        textAlign: "center",
                    }}>
                        <th>Bet Name</th>
                        <th>Bet Amount</th>
                        <th>Result</th>
                    </tr>
                    {Object.keys(props.betsOnBoard).map((betOption) => {
                        return (
                            <tr
                                key={betOption}
                                style={{
                                    textAlign: "center",
                                }}>
                                <td>{betOption}</td>
                                <td className="bet-results-info-table-bet-amount">{"$ " + props.betsOnBoard[betOption].toString()}</td>
                                <td>{getBetResultMessage(props, betOption)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function getBetResultMessage(props, betOption) {
    const winner = "WINNER";
    const loser = "LOSER";
    return props.winningBetOptions.includes(betOption) ? winner : loser;
}
