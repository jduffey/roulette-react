import { getWheelNumberColor } from "../common/getWheelNumberColor";

const CLASS_NAME = "BetResultsInfo-component";
export function BetResultsInfo(props) {
    const previousRoundHasBetResults = Object.keys(props.previousRoundResults.betsPlaced).length > 0;

    let startingBalanceText = "-";
    let finalBalanceText = "-";
    let netChangeInBalanceText = "-";
    if (previousRoundHasBetResults) {
        startingBalanceText = `$ ${props.previousRoundResults.startingBalance}`;
        finalBalanceText = `$ ${props.previousRoundResults.finalBalance}`;
        netChangeInBalanceText = `$ ${props.previousRoundResults.finalBalance - props.previousRoundResults.startingBalance}`;
    }
    const sumBetAmounts = Object.values(props.previousRoundResults.betsPlaced).reduce((acc, bet) => acc + bet.betAmount, 0);
    const sumWinnings = Object.values(props.previousRoundResults.betsPlaced).reduce((acc, bet) => acc + bet.winningsOnBet, 0);
    const sumBetsReturned = Object.values(props.previousRoundResults.betsPlaced).reduce((acc, bet) => acc + bet.betReturned, 0);

    const previousWheelNumberDiv = () => {
        const backgroundColor = previousRoundHasBetResults ?
            getWheelNumberColor(props.previousRoundResults.winningWheelNumber)
            : "#dfdfdf";

        const wheelNumberText = previousRoundHasBetResults ?
            props.previousRoundResults.winningWheelNumber :
            "??";

        return (
            <div
                className="bet-info-table-title-spin-result"
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                {wheelNumberText}
            </div>
        )
    }

    const betResultsRows = () => Object.keys(props.previousRoundResults.betsPlaced).map((betOption) => {
        const betAmountOnBet = props.previousRoundResults.betsPlaced[betOption].betAmount;
        const winningsOnBet = props.previousRoundResults.betsPlaced[betOption].winningsOnBet;
        const betReturnedAmount = props.previousRoundResults.betsPlaced[betOption].betReturned;
        return (
            <tr key={betOption}>
                <td>{betOption}</td>
                <td className="bet-results-info-table-bet-amount">{`$ ${betAmountOnBet}`}</td>
                <td>{winningsOnBet}</td>
                <td>{betReturnedAmount}</td>
            </tr>
        );
    });

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

                {previousWheelNumberDiv()}

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

                    {betResultsRows()}

                    <tr style={{ height: "10px" }} />
                    <tr>
                        <td>TOTALS</td>
                        <td>{`$ ${sumBetAmounts}`}</td>
                        <td>{`$ ${sumWinnings}`}</td>
                        <td>{`$ ${sumBetsReturned}`}</td>
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
