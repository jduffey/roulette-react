import React from 'react';
import { Box } from '@mui/material';
import DepositEthButton from './DepositEthButton';
import WithdrawEthButton from './WithdrawEthButton';

const TransactionButtonContainer = () => {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'lightyellow',
                borderRadius: '20px',
                padding: '30px',
                gap: '40px',
                '& > *': {
                    // Shift up to compensate for the the shadow on the buttons
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <DepositEthButton />
            <WithdrawEthButton />
        </Box>
    );
};

export default TransactionButtonContainer;
