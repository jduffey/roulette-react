import DepositEthButton from "./DepositEthButton";
import WithdrawEthButton from "./WithdrawEthButton";

export function ManageFunds() {
    return (
        <div
            style={{
                width: 1440,
                height: 1024,
                outline: '1px solid red',
            }}
        >
            <DepositEthButton />
            <WithdrawEthButton />
        </div>
    );
}