const className = "bet-results-info";
export function BetResultsInfo(props) {
    return (
        <div className={className}>
            <div
                className="bet-info-table-title"
            >
                BET RESULTS
            </div>
            <table className="bet-results-info-table">
                <tbody>
                    <tr style={{
                        textAlign: "center",
                    }}>
                        <th>Bet Name</th>
                        <th>Bet Amount</th>
                        <th>Winnings</th>
                        <th>Net</th>
                    </tr>
                    {Object.keys(props.betResults).map((betOption) => {
                        const betAmountOnBet = props.betResults[betOption];
                        const winningsOnBet = calculateWinningsOnBet(props, betOption);
                        const netOnBet = calculateNetOnBet(betAmountOnBet, winningsOnBet);

                        return (
                            <tr
                                key={betOption}
                                style={{
                                    textAlign: "center",
                                }}>
                                <td>{betOption}</td>
                                <td className="bet-results-info-table-bet-amount">{"$ " + betAmountOnBet.toString()}</td>
                                <td>{winningsOnBet}</td>
                                <td>{netOnBet}</td>
                            </tr>
                        );
                    })}
                    <tr style={{ height: "10px" }}></tr>
                    {<tr>
                        <td>Total</td>
                        <td>Sum</td>
                        <td>Sum</td>
                        <td>Sum</td>
                    </tr>}
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

    const betAmount = props.betResults[betOption];

    return props.winningBetOptions.includes(betOption) ?
        betAmount * multipliers[betOption] :
        0;
}

function calculateNetOnBet(betAmount, winnings) {
    return winnings ?
        winnings + betAmount :
        -betAmount;
}
