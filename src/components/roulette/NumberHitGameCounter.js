const CLASS_NAME = "NumbersHitGameCounter-component";
export function NumbersHitGameCounter(props) {
    const gameCounter = props.transactionHistory.length;

    return (
        <div
            className={CLASS_NAME}
        >
            {Array(240).fill("").map((_, i) => {
                const bgColor = i < gameCounter ? "yellow" : "inherit";
                const outline = [108, 119, 128, 136, 144, 152, 162, 172, 185, 201, 229].includes(i) ? "1px solid black" : "none";
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
