import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonContainer from "./ButtonContainer";
import DepositEthButton from "./DepositEthButton";
import PageTitle from "./PageTitle";
import WithdrawEthButton from "./WithdrawEthButton";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const playerTransactions = [
    { date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
    { date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
];

const houseTransactions = [
    { date: "2023-06-01", amount: "500 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "100 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "300 ETH", type: "Deposit" },
    { date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
];

const tableTheme = createTheme({
    typography: {
        fontFamily: 'Lexend Mega, sans-serif',
    },
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#f9f9f9',
                    },
                    '&:nth-of-type(even)': {
                        backgroundColor: '#e0e0e0',
                    },
                }
            }
        }
    }
});

export function ManageFunds() {
    return (
        <Box
            sx={{
                width: 1440,
                height: 1024,
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
                    height: "100%",
                    marginTop: "36px",
                }}
            >
                <PlayerBox />
                <HouseBox />
            </Box>
        </Box>
    );
}

const PlayerBox = () => (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
        position: "relative"
    }}>
        <Typography
            variant="h4"
            sx={{
                fontFamily: "Lexend Mega, sans-serif",
                fontWeight: "bold",
                fontSize: "24px",
                color: "#000000",
                marginBottom: "8px",
            }}
        >
            Player
        </Typography>
        <Typography
            variant="h4"
            sx={{
                alignSelf: "flex-start",
                fontFamily: "Lexend Mega, sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
                color: "#000000",
                marginBottom: "8px",
                paddingLeft: 'calc((100% - 80%)/2)',
            }}
        >
            Transaction History
        </Typography>
        <ThemeProvider theme={tableTheme}>
            <TableContainer
                sx={{
                    height: "80%",
                    width: "80%",
                }}>
                <Table>
                    <TableBody>
                        {playerTransactions.map((rowData, index) => (
                            <TableRow key={index}>
                                <TableCell>{rowData.date}</TableCell>
                                <TableCell>{rowData.amount}</TableCell>
                                <TableCell>{rowData.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        <Box sx={{ position: "absolute", bottom: "0px", outline: '0px solid red' }}>
            <ButtonContainer children={[<DepositEthButton />, <WithdrawEthButton />]} />
        </Box>
    </Box>
);

const HouseBox = () => (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
    }}>
        <Typography
            variant="h4"
            sx={{
                fontFamily: "Lexend Mega, sans-serif",
                fontWeight: "bold",
                fontSize: "24px",
                color: "#000000",
                marginBottom: "8px",
            }}
        >
            House
        </Typography>
        <Typography
            variant="h4"
            sx={{
                alignSelf: "flex-start",
                fontFamily: "Lexend Mega, sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
                color: "#000000",
                marginBottom: "8px",
                paddingLeft: 'calc((100% - 80%)/2)',
            }}
        >
            Transaction History
        </Typography>
        <ThemeProvider theme={tableTheme}>
            <TableContainer
                sx={{
                    height: "100%",
                    width: "80%",
                }}>
                <Table>
                    <TableBody>
                        {houseTransactions.map((rowData, index) => (
                            <TableRow key={index}>
                                <TableCell>{rowData.date}</TableCell>
                                <TableCell>{rowData.amount}</TableCell>
                                <TableCell>{rowData.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    </Box>
);