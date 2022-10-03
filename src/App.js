import React from "react";

import useToken from "./components/App/useToken";
import { createTheme, ThemeProvider } from "@mui/material";
import Router from "./routes";

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
    const { token, deleteToken, setToken } = useToken();

    return (
        <ThemeProvider theme={theme}>
            <Router
                token={token}
                deleteToken={deleteToken}
                setToken={setToken}
            />
        </ThemeProvider>
    );
}

export default App;
