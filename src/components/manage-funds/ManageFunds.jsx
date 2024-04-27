import ButtonContainer from "./ButtonContainer";
import DepositEthButton from "./DepositEthButton";
import WithdrawEthButton from "./WithdrawEthButton";

export function ManageFunds() {
    return (
        <div
            style={{
                width: 1440,
                height: 1024,
                outline: '1px solid red',
                backgroundColor: '#FFFFFF',
            }}
        >
            <ButtonContainer
                children={[
                    <DepositEthButton />,
                    <WithdrawEthButton />,
                ]}
            />
        </div>
    );
}