import { WINNING_CRITERIA } from "../common/winning-criteria";

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
        "$ " + props.startingBalance.toString() :
        "";

    const netChangeInBalance = sumWinnings + sumBetsReturned - sumBetAmounts;
    const netChangeInBalanceText = props.startingBalance ?
        "$ " + netChangeInBalance.toString() :
        "";

    const finalBalance = props.startingBalance + netChangeInBalance;
    const finalBalanceText = props.startingBalance ?
        "$ " + finalBalance.toString() :
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

                        let winningsOnBet = calculateWinningsOnBet(props, betOption);
                        const winningsOnBetText = winningsOnBet ? "$ " + winningsOnBet.toString() : "";

                        let betReturnedAmount = calculateBetReturnedAmount(props, betOption);
                        const betReturnedAmountText = betReturnedAmount ? "$ " + betReturnedAmount.toString() : "";

                        return (
                            <tr key={betOption}>
                                <td>{betOption}</td>
                                <td className="bet-results-info-table-bet-amount">{"$ " + betAmountOnBet.toString()}</td>
                                <td>{winningsOnBetText}</td>
                                <td>{betReturnedAmountText}</td>
                            </tr>
                        );
                    })}
                    <tr style={{ height: "10px" }}></tr>
                    <tr>
                        <td>TOTALS</td>
                        <td>{"$ " + sumBetAmounts}</td>
                        <td>{"$ " + sumWinnings}</td>
                        <td>{"$ " + sumBetsReturned}</td>
                    </tr>
                    <tr style={{ height: "10px" }}></tr>
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

function calculateWinningsOnBet(props, betOption) {
    const multipliers = {
        "1": 35,
        "2": 35,
        "3": 35,
        "4": 35,
        "5": 35,
        "6": 35,
        "7": 35,
        "8": 35,
        "9": 35,
        "10": 35,
        "11": 35,
        "12": 35,
        "13": 35,
        "14": 35,
        "15": 35,
        "16": 35,
        "17": 35,
        "18": 35,
        "19": 35,
        "20": 35,
        "21": 35,
        "22": 35,
        "23": 35,
        "24": 35,
        "25": 35,
        "26": 35,
        "27": 35,
        "28": 35,
        "29": 35,
        "30": 35,
        "31": 35,
        "32": 35,
        "33": 35,
        "34": 35,
        "35": 35,
        "36": 35,
        "0": 35,
        "00": 35,
        "1st 12": 2,
        "2nd 12": 2,
        "3rd 12": 2,
        "Top Row": 2,
        "Middle Row": 2,
        "Bottom Row": 2,
        "1 to 18": 1,
        "19 to 36": 1,
        "Even": 1,
        "Odd": 1,
        "Red": 1,
        "Black": 1,
    };

    const betAmount = props.bets[betOption];

    return WINNING_CRITERIA[props.winningWheelNumber].includes(betOption) ?
        betAmount * multipliers[betOption] :
        0;
}

function calculateBetReturnedAmount(props, betOption) {
    return WINNING_CRITERIA[props.winningWheelNumber].includes(betOption) ?
        props.bets[betOption] :
        0;
}
