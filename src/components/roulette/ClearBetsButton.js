const CLASS_NAME = "ClearBetsButton-component";

export function ClearBetsButton(props) {
    const hasBets = props.pendingBets && props.pendingBets.length > 0;
    const isDisabled = props.wheelIsSpinning || !hasBets;

    return (
        <div className={CLASS_NAME}>
            <button
                className="clear-bets-button"
                onClick={props.onClick}
                disabled={isDisabled}
                style={{
                    backgroundColor: isDisabled ? "#cccccc" : "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.6 : 1,
                }}
            >
                Clear All Bets
            </button>
        </div>
    );
} 