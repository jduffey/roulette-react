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
];

const houseTransactions = [
    { date: "2023-06-01", amount: "500 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "100 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "300 ETH", type: "Deposit" },
    { date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
    { date: "2023-06-01", amount: "500 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "100 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "300 ETH", type: "Deposit" },
    { date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
];

const transactionHistoryTableTheme = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontFamily: 'Lexend Mega, sans-serif',
                }
            }
        },
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
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    width: '80%',
                    borderRadius: '20px',
                    border: '2px solid #000000',
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
        <Box sx={{
            display: "flex",
            width: "77.5%",
            justifyContent: "space-between",
            marginBottom: "8px",
        }}>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Lexend Mega, sans-serif",
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#000000",
                }}
            >
                Player
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Lexend Mega, sans-serif",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#000000",
                }}
            >
                834.9332 ETH
            </Typography>
        </Box>
        <ThemeProvider theme={transactionHistoryTableTheme}>
            <TableContainer sx={{
                height: "80%",
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
        <Box sx={{
            position: "absolute",
            bottom: "16px"
        }}>
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
        <Box sx={{
            display: "flex",
            width: "77.5%",
            justifyContent: "space-between",
            marginBottom: "8px",
        }}>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Lexend Mega, sans-serif",
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#000000",
                }}
            >
                House
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Lexend Mega, sans-serif",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#000000",
                }}
            >
                9434.0046 ETH
            </Typography>
        </Box>
        <ThemeProvider theme={transactionHistoryTableTheme}>
            <TableContainer sx={{
                height: "90%",
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