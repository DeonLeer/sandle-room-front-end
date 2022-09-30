import React from "react";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";


export default function NavBar(props) {
    const logout = props.logout;
    return (
        <AppBar position="fixed" sx={{zIndex: 1500}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-evenly', color: 'black'}}>
                <Typography variant="h3" >Welcome to Sandle Room</Typography>
                <Button variant="contained" onClick={() => logout()} sx={{color: "#FAF9F6", backgroundColor: "#6C603C"}}>Log Out</Button>
            </Toolbar>
        </AppBar>
    )
}