// Import necessary dependencies
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/login"); // Redirect to the homepage
    };

    return (
        <Container
            maxWidth="sm"
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

export default NotFoundPage;
