import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const auth = authService();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        auth.login(email, password).then((response, error) => {
            if (error) {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setLoading(false);
            }
            window.location.reload();
        });
    };

    return (
        <Box
            sx={{
                backgroundImage: theme.backgroundImage,
                backgroundSize: "cover",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={6}
                sx={{ width: "50%", height: "50%", padding: "30px" }}
            >
                <Typography variant="h2">Please Log In</Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        paddingTop: "30px",
                        height: "60%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{ color: "black" }}
                        type="submit"
                        disabled={loading}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired,
// };
