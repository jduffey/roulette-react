import { getWinningCriteria } from "../common/winning-criteria";

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
        "StraightUp_0": 35,
        "StraightUp_00": 35,
        "StraightUp_1": 35,
        "StraightUp_2": 35,
        "StraightUp_3": 35,
        "StraightUp_4": 35,
        "StraightUp_5": 35,
        "StraightUp_6": 35,
        "StraightUp_7": 35,
        "StraightUp_8": 35,
        "StraightUp_9": 35,
        "StraightUp_10": 35,
        "StraightUp_11": 35,
        "StraightUp_12": 35,
        "StraightUp_13": 35,
        "StraightUp_14": 35,
        "StraightUp_15": 35,
        "StraightUp_16": 35,
        "StraightUp_17": 35,
        "StraightUp_18": 35,
        "StraightUp_19": 35,
        "StraightUp_20": 35,
        "StraightUp_21": 35,
        "StraightUp_22": 35,
        "StraightUp_23": 35,
        "StraightUp_24": 35,
        "StraightUp_25": 35,
        "StraightUp_26": 35,
        "StraightUp_27": 35,
        "StraightUp_28": 35,
        "StraightUp_29": 35,
        "StraightUp_30": 35,
        "StraightUp_31": 35,
        "StraightUp_32": 35,
        "StraightUp_33": 35,
        "StraightUp_34": 35,
        "StraightUp_35": 35,
        "StraightUp_36": 35,
        "1st 12": 2,
        "2nd 12": 2,
        "3rd 12": 2,
        "1st Column": 2,
        "2nd Column": 2,
        "3rd Column": 2,
        "1 to 18": 1,
        "19 to 36": 1,
        "Even": 1,
        "Odd": 1,
        "Red": 1,
        "Black": 1,
    };

    const betAmount = props.bets[betOption];

    return getWinningCriteria(props.winningWheelNumber).includes(betOption) ?
        betAmount * multipliers[betOption] :
        0;
}

function calculateBetReturnedAmount(props, betOption) {
    return getWinningCriteria(props.winningWheelNumber).includes(betOption) ?
        props.bets[betOption] :
        0;
}
