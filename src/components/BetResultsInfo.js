import { getWheelNumberColor } from "../common/getWheelNumberColor";

const CLASS_NAME = "BetResultsInfo-component";
export function BetResultsInfo(props) {
    console.log("BetResultsInfo props", props);

    const startingBalanceText = props.startingBalance;

    const finalBalanceText = props.finalBalance;

    const netChangeInBalanceText = props.finalBalance - props.startingBalance;

    return (
        <div
            className={CLASS_NAME}
        >
            <div
                className="bet-info-table-title-container"
            >
                <div
                    className="bet-info-table-title-text"
                >
                    PREVIOUS ROUND RESULTS
                </div>
                <div
                    className="bet-info-table-title-spin-result"
                    style={{
                        backgroundColor: props.winningWheelNumber ? getWheelNumberColor(props.winningWheelNumber) : "#dfdfdf",
                    }}
                >
                    {props.winningWheelNumber ?? "?"}
                </div>

            </div>
            <table className="bet-results-info-table">
                <tbody>
                    <tr style={{
                        textAlign: "center",
                    }}>
                        <th>Bet Name</th>
                        <th>Bet Amount</th>
                        <th>Winnings</th>
                        <th>Bet Returned</th>
                    </tr>
                    {Object.keys(props.bets).map((betOption) => {
                        console.log("betOption", betOption);
                        const betAmountOnBet = props.bets[betOption].betAmount;
                        const winningsOnBet = props.bets[betOption].winningsOnBet;
                        const betReturnedAmount = props.bets[betOption].betReturned;

                        return (
                            <tr key={betOption}>
                                <td>{betOption}</td>
                                <td className="bet-results-info-table-bet-amount">{`$ ${betAmountOnBet}`}</td>
                                <td>{winningsOnBet}</td>
                                <td>{betReturnedAmount}</td>
                            </tr>
                        );
                    })}
                    <tr style={{ height: "10px" }} />
                    <tr>
                        <td>TOTALS</td>
                        {/* <td>{`$ ${sumBetAmounts}`}</td>
                        <td>{`$ ${sumWinnings}`}</td>
                        <td>{`$ ${sumBetsReturned}`}</td> */}
                    </tr>
                    <tr style={{ height: "10px" }} />
                    <tr className="balance-change-value">
                        <td>
                            Starting
                        </td>
                        <td colSpan={3}>
                            {startingBalanceText}
                        </td>
                    </tr>
                    <tr className="balance-change-value">
                        <td>
                            Net
                        </td>
                        <td colSpan={3}>
                            {netChangeInBalanceText}
                        </td>
                    </tr>
                    <tr className="balance-change-value">
                        <td>
                            Final
                        </td>
                        <td colSpan={3}>
                            {finalBalanceText}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
}
