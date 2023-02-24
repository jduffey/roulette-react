const CLASS_NAME = "NumbersHitGameCounter-component";
function NumbersHitGameCounter(props) {
    const gameCounter = props.transactionHistory.length;

    return (
        <div
            className={CLASS_NAME}
        >
            {Array(300).fill("").map((_, i) => {
                const bgColor = i < gameCounter ? "yellow" : "inherit";
                const outline = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 220, 230, 240, 250, 260, 270, 280, 290, 300].includes(i) ? "1px solid black" : "none";
                return (
                    <div className="game-counter-bar-element"
                        key={i}
                        style={{
                            backgroundColor: bgColor,
                            color: "black",
                            outline: outline,
                        }}
                    >
                        {
                            "\u00A0" // nbsp, so that the div is not empty and outlines will show
                        }
                    </div>
                );
            })}
        </div>
    );
}

function NumbersHitGameCounterOverlay(props) {
    const spinCounter = props.transactionHistory.length;

    const styles = (counter, bin) => {
        // "inactive" for all boxes if no spins yet ("new game")
        if (counter === 0) {
            return {
                color: "gray",
                backgroundColor: "inherit",
            };
        }
        // else, "active" is 1-39 for 1st box, 40-49 for 2nd, 50-59 for 3rd, etc.
        if (Math.max(1, (counter - 20) / 10) >= bin) {
            return {
                color: "black",
                backgroundColor: "#F0F4",
                fontSize: "16px",
                fontWeight: "bold",
            };
        }
        // else, we don't have the required spins yet; "inactive"
        return {
            color: "gray",
            backgroundColor: "inherit",
        };
    }

    return (
        <div
            className="NumbersHitGameCounterOverlay-component">
            <div id="NumbersHitGameCounterOverlap-top-box" className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 1)}>1</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 2)}>2</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 3)}>3</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 4)}>4</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 5)}>5</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 6)}>6</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 7)}>7</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 8)}>8</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 9)}>9</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 10)}>10</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 11)}>11</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 12)}>12</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 13)}>13</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 14)}>14</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 15)}>15</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 16)}>16</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 17)}>17</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 18)}>18</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 19)}>19</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 20)}>20</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 21)}>21</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 22)}>22</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 23)}>23</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 24)}>24</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 25)}>25</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 26)}>26</div>
            <div className="NumbersHitGameCounterOverlap-box" style={styles(spinCounter, 27)}>27</div>
        </div>
    );
}

export { NumbersHitGameCounter, NumbersHitGameCounterOverlay }