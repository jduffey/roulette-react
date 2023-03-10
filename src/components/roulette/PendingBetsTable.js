const betRow = (betName, betAmount) => {
    return (
        <tr key={betName}>
            <td>
                {betName}
            </td>
            <td className="pending-bets-info-table-bet-amount">
                {`$ ${betAmount}`}
            </td>
        </tr>
    );
}

const CLASS_NAME = "PendingBetsTable-component";
export function PendingBetsTable(props) {
    const tableHeaders = (
        <tr style={{ textAlign: "center" }}>
            <th>Bet Name</th>
            <th>Bet Amount</th>
        </tr>
    );

    const tableBody = (
        <tbody>
            {tableHeaders}
            {Object.entries(props.pendingBets.reduce((acc, pendingBet) => {
                acc[pendingBet.betName] = (acc[pendingBet.betName] || 0) + pendingBet.betAmount;
                return acc;
            }, {})).map(([betName, betAmount]) => betRow(betName, betAmount))}
        </tbody>
    )

    return (
        <div className={CLASS_NAME}>
            <div className="pending-bets-info-table-title-text">
                Pending Bets
            </div>
            <table className="pending-bets-info-table">
                {tableBody}
            </table>
        </div>
    );
}
