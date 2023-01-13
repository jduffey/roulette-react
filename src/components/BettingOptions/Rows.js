export function Rows(props) {
    const betAmountText = "$" + props.betAmount;
    const isVisible = props.betAmount > 0 ? "" : "none";

    return (
        <div
            className={`betting-square-visible betting-square-${props.betName}`}
            onClick={props.onClick}
            style={{
                left: props.styleData.left,
                top: props.styleData.top,
                height: props.styleData.height,
                width: props.styleData.width,
                backgroundColor: props.styleData.backgroundColor,
            }}
        >
            <div className="rows-square-contents">
                <div
                    className="rows-square-label"
                >
                    {props.displayLabel}
                </div>
                <div
                    className="rows-square-chip"
                    style={{
                        display: isVisible
                    }}
                >
                    {betAmountText}
                </div>
            </div>
        </div>
    );
}
