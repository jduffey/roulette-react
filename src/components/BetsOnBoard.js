export function BetsOnBoard(props) {
    return (
        <div className="betting-history">
            <div className="status-message">
                {"PLACEHOLDER FOR MOST RECENT SPIN RESULTS"}
            </div>
            <ol>
                {props.buttons}
            </ol>
        </div>
    );
}
