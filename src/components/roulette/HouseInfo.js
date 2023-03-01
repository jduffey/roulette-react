const CLASS_NAME = "HouseInfo-component";
export function HouseInfo(props) {
    const houseBalanceText = props.houseBalance
        ? `⛓ ${parseFloat(props.houseBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "Loading...";

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                {"House Balance"}
                < br />
                <span className="rewards-info-value">
                    {houseBalanceText}
                </span>
            </div>
        </div >
    )
}
