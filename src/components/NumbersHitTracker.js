import { WHEEL_NUMBERS } from "../common/wheelNumbers";

const CLASS_NAME = "NumbersHitTracker-component";
export function NumbersHitTracker(props) {
    const allHitNumbers = new Set();
    props.transactionHistory.forEach((tx) => {
        allHitNumbers.add(tx.spinResult);
    });

    return (
        <div
            className={CLASS_NAME}
        >
            {Object.values(WHEEL_NUMBERS).map((wheelNumber, i) => {

                const bgColor = allHitNumbers.has(wheelNumber) ?
                    "yellow" :
                    "inherit";
                const color = allHitNumbers.has(wheelNumber) ?
                    "black" :
                    "gray";
                return (
                    <div className="hit-number"
                        key={i}
                        style={{
                            backgroundColor: bgColor,
                            color: color,
                        }}
                    >
                        {wheelNumber}
                    </div>
                );
            })}
        </div>
    );
}
