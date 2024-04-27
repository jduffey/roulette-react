import ButtonContainer from "./ButtonContainer";
import DepositEthButton from "./DepositEthButton";
import PageTitle from "./PageTitle";
import WithdrawEthButton from "./WithdrawEthButton";
import { Box } from "@mui/material";

export function ManageFunds() {
    return (
        <Box
            sx={{
                width: 1440,
                height: 1024,
                outline: '1px solid red',
                backgroundColor: '#FFFFFF',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PageTitle title="MANAGE FUNDS" />
            </Box>
            <ButtonContainer
                children={[
                    <DepositEthButton />,
                    <WithdrawEthButton />,
                ]}
            />
        </Box>
    );
}