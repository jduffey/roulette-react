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
                    <tr>
                        <th>Bet Name</th>
                        <th>Bet Amount</th>
                        <th>Result</th>
                    </tr>
                    {Object.keys(props.betsOnBoard).map((betOption) => {
                        return (
                            <tr key={betOption}>
                                <td>{betOption}</td>
                                <td>{props.betsOnBoard[betOption]}</td>
                                <td>Pending</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}