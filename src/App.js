import React, { useState, createContext } from "react";
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

export const UserContext = createContext();

function App() {

    const authServices = authService();

    const user = authServices.getCurrentUser();

    const logout = authServices.logout;

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{ user: user, logout: logout }}>
                <Router/>            
            </UserContext.Provider>
        </ThemeProvider>
    );
}

export default App;
