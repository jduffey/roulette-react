import React from 'react';
import { Box } from '@mui/material';
import TransactionButton from './TransactionButton';

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
            <TransactionButton backgroundColor="#A388EE" text="Deposit" />
            <TransactionButton backgroundColor="#FFA07A" text="Withdraw" />
        </Box>
    );
};

export default TransactionButtonContainer;
