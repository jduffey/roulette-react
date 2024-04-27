import ButtonContainer from "./ButtonContainer";
import DepositEthButton from "./DepositEthButton";
import PageTitle from "./PageTitle";
import WithdrawEthButton from "./WithdrawEthButton";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const playerTransactions = [
    { id: 1, date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { id: 2, date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { id: 3, date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
    { id: 4, date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { id: 5, date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { id: 6, date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
];

const houseTransactions = [
    { id: 1, date: "2023-06-01", amount: "500 ETH", type: "Deposit" },
    { id: 2, date: "2023-06-02", amount: "100 ETH", type: "Withdraw" },
    { id: 3, date: "2023-06-03", amount: "300 ETH", type: "Deposit" },
    { id: 4, date: "2023-06-01", amount: "100 ETH", type: "Deposit" },
    { id: 5, date: "2023-06-02", amount: "50 ETH", type: "Withdraw" },
    { id: 6, date: "2023-06-03", amount: "200 ETH", type: "Deposit" },
];

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
                    height: "100%",
                    marginTop: "36px",
                    outline: '4px solid orange',
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", outline: "4px solid blue", position: "relative" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "Lexend Mega, sans-serif",
                            fontWeight: "bold",
                            fontSize: "24px",
                            color: "#000000",
                            marginBottom: "8px",
                            outline: '4px solid orange',
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
                            outline: '4px solid orange',
                            paddingLeft: 'calc((100% - 80%)/2)',
                        }}
                    >
                        Transaction History
                    </Typography>
                    <TableContainer component={Paper} sx={{ width: "80%", outline: '4px solid red', backgroundColor: '#DDD' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {playerTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ position: "absolute", bottom: "0px" }}>
                        <ButtonContainer children={[<DepositEthButton />, <WithdrawEthButton />]} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", outline: "5px solid green" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "Lexend Mega, sans-serif",
                            fontWeight: "bold",
                            fontSize: "24px",
                            color: "#000000",
                            marginBottom: "8px",
                            outline: '4px solid orange',
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
                            outline: '4px solid orange',
                            paddingLeft: 'calc((100% - 80%)/2)',
                        }}
                    >
                        Transaction History
                    </Typography>
                    <TableContainer component={Paper} sx={{ width: "80%", outline: '4px solid red', backgroundColor: '#DDD' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {houseTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}