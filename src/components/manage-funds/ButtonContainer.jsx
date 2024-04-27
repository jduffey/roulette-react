import React from 'react';
import { Box } from '@mui/material';
import DepositEthButton from './DepositEthButton';
import WithdrawEthButton from './WithdrawEthButton';

const Container = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#D9D9D9',
                borderRadius: '20px',
                padding: '30px',
                gap: '40px',
                '& > *': {
                    // Shift up to compensate for the the shadow on the buttons
                    transform: 'translateY(-2px)',
                  },
            }}
        >
            {children}
        </Box>
    );
};

const ButtonContainer = () => {
    return (
        <Container>
            <DepositEthButton />
            <WithdrawEthButton />
        </Container>
    );
};

export default ButtonContainer;