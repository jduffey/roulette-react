const CLASS_NAME = "PendingBetsTable-component";
export function PendingBetsTable(props) {
    const tableHeaders = (
        <tr style={{ textAlign: "center" }}>
            <th>Bet Name</th>
            <th>Bet Amount</th>
            <th>Action</th>
        </tr>
    );

    const handleRemoveBet = (betIndex) => {
        if (props.wheelIsSpinning) {
            alert("Cannot remove bets while wheel is spinning!");
            return;
        }
        
        // Call parent function to remove bet
        props.onRemoveBet(betIndex);
    };

    const tableBody = (
        <tbody>
            {tableHeaders}
            {props.pendingBets.map((bet, index) => (
                <tr key={`${bet.betName}-${index}`}>
                    <td>{bet.betName}</td>
                    <td className="pending-bets-info-table-bet-amount">
                        {`$ ${bet.betAmount}`}
                    </td>
                    <td>
                        <button 
                            className="remove-bet-button"
                            onClick={() => handleRemoveBet(index)}
                            disabled={props.wheelIsSpinning}
                            aria-label={`Remove ${bet.betName} bet`}
                            style={{
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                cursor: props.wheelIsSpinning ? 'not-allowed' : 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            ✕
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );

    return (
        <div className={CLASS_NAME}>
            <div className="pending-bets-info-table-title-text">
                Pending Bets ({props.pendingBets.length})
            </div>
            <table className="pending-bets-info-table">
                {tableBody}
            </table>
        </div>
    );
}
