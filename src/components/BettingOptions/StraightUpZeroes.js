export function StraightUpZeroes(props) {
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
            <div className="zero-square-contents">
                <div className="zero-square-label">
                    {props.displayLabel}
                </div>
                <div
                    className="zero-square-chip"
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
