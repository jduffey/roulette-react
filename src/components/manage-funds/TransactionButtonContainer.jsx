import React from 'react';
import { Box } from '@mui/material';
import DepositEthButton from './DepositEthButton';
import WithdrawEthButton from './WithdrawEthButton';

const TransactionButtonContainer = () => {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                paddingLeft: '30px',
                paddingRight: '30px',
                gap: '40px'
            }}
        >
            <DepositEthButton />
            <WithdrawEthButton />
        </Box>
    );
};

export default TransactionButtonContainer;
