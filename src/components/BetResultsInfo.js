import { getBetNameMultiplier } from "../common/getBetNameMultiplier";
import { getWinningCriteria } from "../common/getWinningCriteria";

function calculateWinningsOnBet(props, betOption) {
    const multiplier = getBetNameMultiplier(betOption);

    const betAmount = props.bets[betOption];

    return getWinningCriteria(props.winningWheelNumber).has(betOption) ?
        betAmount * multiplier :
        0;
}

function calculateBetReturnedAmount(props, betOption) {
    return getWinningCriteria(props.winningWheelNumber).has(betOption) ?
        props.bets[betOption] :
        0;
}

const className = "bet-results-info";
export function BetResultsInfo(props) {
    const sumBetAmounts = Object.keys(props.bets).reduce((acc, betOption) => {
        const betAmountOnBet = props.bets[betOption];
        return acc + betAmountOnBet;
    }, 0);

    const sumWinnings = Object.keys(props.bets).reduce((acc, betOption) => {
        const winningsOnBet = calculateWinningsOnBet(props, betOption);
        return acc + winningsOnBet;
    }, 0);

    const sumBetsReturned = Object.keys(props.bets).reduce((acc, betOption) => {
        const betReturnedAmount = calculateBetReturnedAmount(props, betOption);
        return acc + betReturnedAmount;
    }, 0);

    const startingBalanceText = props.startingBalance ?
        `$ ${props.startingBalance.toString()}` :
        "";

    const netChangeInBalance = sumWinnings + sumBetsReturned - sumBetAmounts;
    const netChangeInBalanceText = props.startingBalance ?
        `$ ${netChangeInBalance.toString()}` :
        "";

    const finalBalance = props.startingBalance + netChangeInBalance;
    const finalBalanceText = props.startingBalance ?
        `$ ${finalBalance.toString()}` :
        "";

    return (
        <div className={className}>
            <div
                className="bet-info-table-title"
            >
                PREVIOUS ROUND RESULTS
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
                        const betAmountOnBet = props.bets[betOption];

                        const winningsOnBet = calculateWinningsOnBet(props, betOption);
                        const winningsOnBetText = winningsOnBet ? `$ ${winningsOnBet.toString()}` : "";

                        const betReturnedAmount = calculateBetReturnedAmount(props, betOption);
                        const betReturnedAmountText = betReturnedAmount ? `$ ${betReturnedAmount.toString()}` : "";

                        return (
                            <tr key={betOption}>
                                <td>{betOption}</td>
                                <td className="bet-results-info-table-bet-amount">{`$ ${betAmountOnBet.toString()}`}</td>
                                <td>{winningsOnBetText}</td>
                                <td>{betReturnedAmountText}</td>
                            </tr>
                        );
                    })}
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
        </div>
    );
}
