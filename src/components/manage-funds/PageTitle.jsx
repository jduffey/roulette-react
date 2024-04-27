import { Typography } from "@mui/material";

const PageTitle = ({ title }) => (
    <Typography
        sx={{
            fontFamily: 'Lexend Mega, sans-serif',
            fontWeight: 'bold',
            fontSize: '36px',
            color: '#000000',
            outline: '2px solid green',
        }}
    >
        {title}
    </Typography>
);

export default PageTitle;
