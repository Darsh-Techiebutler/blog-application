import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const FullPageError = () => {
    const navigate = useNavigate(); // Hook is used within the component

    const handleGoHome = () => {
        navigate('/login'); // Direct navigation to login page
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
                padding: 4,
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "#ff6f61", mb: 2 }} />
            <Typography variant="h3" color="textPrimary" gutterBottom>
                404
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                Oops! The page you are looking for does not exist.
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                It might have been moved or deleted.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGoHome}
                sx={{ textTransform: "none" }}
            >
                Go Back Home
            </Button>
        </Container>
    );
};

export default FullPageError;
