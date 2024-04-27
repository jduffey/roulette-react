import ButtonContainer from "./ButtonContainer";
import DepositEthButton from "./DepositEthButton";
import PageTitle from "./PageTitle";
import WithdrawEthButton from "./WithdrawEthButton";
import { Box, Typography } from "@mui/material";

export function ManageFunds() {
    return (
        <Box
            sx={{
                width: 1440,
                height: 1024,
                outline: "1px solid red",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <PageTitle title="MANAGE FUNDS" />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    marginTop: "36px",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '50%' }}>
                    <Typography variant="h4" sx={{ fontFamily: "Lexend Mega, sans-serif", fontWeight: "bold", fontSize: "24px", color: "#000000" }}>
                        Player
                    </Typography>
                    <ButtonContainer
                        children={[<DepositEthButton />, <WithdrawEthButton />]}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '50%' }}>
                    <Typography variant="h4" sx={{ fontFamily: "Lexend Mega, sans-serif", fontWeight: "bold", fontSize: "24px", color: "#000000" }}>
                        House
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}