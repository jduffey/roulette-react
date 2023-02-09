const betRow = (betOption, betAmount) => {
    return (
        <tr key={betOption}>
            <td>
                {betOption}
            </td>
            <td className="current-bets-info-table-bet-amount">
                {`$ ${betAmount}`}
            </td>
        </tr>
    );
}

const CLASS_NAME = "CurrentBetsInfo-component";
export function CurrentBetsInfo(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            <div
                className="current-bets-info-table-title-text"
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
                    {Object.entries(props.pendingBets.reduce((acc, pendingBet) => {
                        acc[pendingBet.betName] = (acc[pendingBet.betName] || 0) + pendingBet.betAmount;
                        return acc;
                    }, {})).map(([betOption, betAmount]) => betRow(betOption, betAmount))}
                </tbody>
            </table>
        </div>
    );
}
