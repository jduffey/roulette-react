const className = "current-bets-info";
export function CurrentBetsInfo(props) {
    return (
        <div className={className}>
            <div
                className="bet-info-table-title"
            >
                CURRENT BETS
            </div>
            <table className="current-bets-info-table">
                <tbody>
                    <tr style={{
                        textAlign: "center",
                    }}>
                        <th>Bet Name</th>
                        <th>Bet Amount</th>
                    </tr>
                    {Object.keys(props.betsOnBoard).map((betOption) => {
                        return (
                            <tr key={betOption}>
                                <td>{betOption}</td>
                                <td className="current-bets-info-table-bet-amount">{"$ " + props.betsOnBoard[betOption].toString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
