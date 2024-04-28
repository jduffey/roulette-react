import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TransactionButtonContainer from "./TransactionButtonContainer";
import PageTitle from "./PageTitle";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import {
    getEthBalance,
    FIRST_PLAYER_ADDRESS,
    HOUSE_ADDRESS
} from "../../common/blockchainWrapper";

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
                    '&:hover': {
                        backgroundColor: '#a9a9a9',
                    },
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    width: '80%',
                    borderRadius: '20px',
                    border: '6px solid #000000',
                }
            }
        }
    }
});

export function ManageFunds() {
    const [ethBalances, setEthBalances] = useState({
        player: '-',
        house: '-',
    });

    useEffect(
        function fetchBalances() {
            (async () => {
                const playerBalance = await getEthBalance(FIRST_PLAYER_ADDRESS);
                const houseBalance = await getEthBalance(HOUSE_ADDRESS);
                setEthBalances({ player: playerBalance, house: houseBalance });
            })();
        },
        []
    );

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
                    marginTop: "16px",
                }}
            >
                <PlayerBox balance={ethBalances.player} />
                <HouseBox balance={ethBalances.house} />
            </Box>
        </Box>
    );
}

const PlayerBox = ({ balance }) => (
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
            alignItems: "baseline",
            marginBottom: "16px",
        }}>
            <Typography
                sx={{
                    fontFamily: "Lexend Mega, sans-serif",
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#000000"
                }}
            >
                Player
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Lexend Mega, sans-serif",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#000000"
                }}
            >
                {balance} ♦︎
            </Typography>
        </Box>
        <ThemeProvider theme={transactionHistoryTableTheme}>
            <TableContainer sx={{
                height: "85%",
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
            <TransactionButtonContainer />
        </Box>
    </Box>
);

const HouseBox = ({ balance }) => (
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
            alignItems: "baseline",
            marginBottom: "16px",
        }}>
            <Typography
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
                sx={{
                    fontFamily: "Lexend Mega, sans-serif",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#000000",
                }}
            >
                {balance} ♦︎
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