import { getWheelNumberColor } from "../common/getWheelNumberColor";

const CLASS_NAME = "MostRecentSpinResults-component";
export function MostRecentSpinResults(props) {
    const numberOfResultsToDisplay = 20;
    const truncatedSpinResults = props.spinResults.slice(-numberOfResultsToDisplay);
    return (
        <div
            className={CLASS_NAME}
        >
            <ul>
                {truncatedSpinResults.map((_, i, arr) => {
                    const wheelNumber = arr[arr.length - 1 - i];
                    return (
                        <div
                            key={i}
                            style={{
                                backgroundColor: getWheelNumberColor(wheelNumber),
                                color: "white",
                                borderRadius: "10%",
                                margin: "1px",
                            }}
                        >
                            {wheelNumber}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
