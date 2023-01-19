const className = "bet-results-info";
export function BetResultsInfo(props) {
    return (
        <div className={className}>
            <div
                className="bet-info-table-title"
            >
                BET RESULTS
            </div>
            <table className="bet-results-info-table">
                <tbody>
                    <tr style={{
                        textAlign: "center",
                    }}>
                        <th>Bet Name</th>
                        <th>Bet Amount</th>
                        <th>Result</th>
                    </tr>
                    {Object.keys(props.betResults).map((betOption) => {
                        return (
                            <tr
                                key={betOption}
                                style={{
                                    textAlign: "center",
                                }}>
                                <td>{betOption}</td>
                                <td className="bet-results-info-table-bet-amount">{"$ " + props.betResults[betOption].toString()}</td>
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
