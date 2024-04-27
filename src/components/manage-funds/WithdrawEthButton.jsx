import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';

const colorAnimation = keyframes`
  0% {
    color: #FFFFFF;
  }
  30% {
    color: #FFFFFF;
  }
  100% {
    color: #000000;
  }
`;

const WithdrawEthButton = () => {
    const handleMouseDown = (event) => {
        event.currentTarget.blur();
    };

    return (
        <Button
            onMouseDown={handleMouseDown}
            disableRipple={true}
            sx={{
                width: 200,
                height: 55,
                borderRadius: '15px',
                border: '4px solid #000000',
                backgroundColor: '#FFA07A',
                boxShadow: '2px 4px 0px rgba(0, 0, 0)',
                '&:focus .MuiTypography-root': {
                    animation: `${colorAnimation} 0.5s forwards`,
                },
                '&:hover': {
                    backgroundColor: '#FFA07A',
                    boxShadow: '2px 4px 0px rgba(0, 0, 0)',
                    '& .MuiTypography-root': {
                        fontSize: '20px',
                    },
                },
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'Lexend Mega, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    color: '#000000',
                }}
            >
                Withdraw
            </Typography>
        </Button>
    );
};

export default WithdrawEthButton;