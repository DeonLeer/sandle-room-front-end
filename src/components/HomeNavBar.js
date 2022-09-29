import { Link } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function HomeNavBar() {
    return (
        <AppBar position="fixed">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-evenly', color: 'black'}}>
                <Typography variant="h3" >Welcome to Sandle Room</Typography>
                <Button variant="contained" href="/login" sx={{color: "#FAF9F6", backgroundColor: "#6C603C"}}>Log In</Button>
            </Toolbar>
        </AppBar>
    )
}