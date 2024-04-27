import { Typography } from "@mui/material";

const PageTitle = ({ title }) => (
    <Typography
        sx={{
            fontFamily: 'Lexend Mega, sans-serif',
            fontWeight: 'bold',
            fontSize: '36px',
            color: '#000000',
        }}
    >
        {title}
    </Typography>
);

export default PageTitle;
