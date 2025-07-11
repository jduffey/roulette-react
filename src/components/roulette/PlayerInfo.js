const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber !== null && chainNumber !== undefined
        ? parseFloat(chainNumber)
            .toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading...";
}

const CLASS_NAME = "PlayerInfo-component";
export function PlayerInfo(props) {
    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                Player Balance
                <br />
                {formattedChainNumber(props.playerBalance, 2)}
            </div>
            <div>
                Player Allowance
                <br />
                {formattedChainNumber(props.playerAllowance, 2)}
            </div>
            <div>
                Current Bet
                <br />
                {props.totalBetAmount.toLocaleString('en-US')}
            </div>
        </div >
    )
}
