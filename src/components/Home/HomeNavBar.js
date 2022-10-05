import { Link } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function HomeNavBar({user}) {
    const button = user ? {href: '/dashboard', label: 'Visit Dashboard'} : {href: '/login', label: 'Log In'}
    return (
        <AppBar position="fixed">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-evenly', color: 'black'}}>
                <Typography variant="h3" >Welcome to Sandle Room</Typography>
                <Button variant="contained" href={button.href} sx={{color: "#FAF9F6", backgroundColor: "#6C603C"}}>{button.label}</Button>
            </Toolbar>
        </AppBar>
    )
}