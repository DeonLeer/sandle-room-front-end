import React, { useState } from "react";

import useToken from "./components/App/useToken";
import { createTheme, ThemeProvider } from "@mui/material";
import Router from "./routes";
import authService from "./services/auth.service";

const theme = createTheme({
    palette: {
        primary: {
            main: "#003d99",
            dark: "#002966",
        },
    },
    backgroundImage: "url('background-image.jpg')",
});

function App() {
    
    const auth = authService();

    const user = auth.getCurrentUser();

    console.log(user)

    const logout = auth.logout;

    return (
        <ThemeProvider theme={theme}>
            <Router
                user={user}
                logout={logout}
            />
        </ThemeProvider>
    );
}

export default App;
