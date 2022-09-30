import { Box, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";

export default function SideBar() {

    return (
        <List disablePadding component={Box} sx={{ width: '200px', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <ListItem key='overview' disablePadding divider >
                <ListItemButton>Overview</ListItemButton>
            </ListItem>
            <ListItem key='appointments' disablePadding divider >
                <ListItemButton>Appointments</ListItemButton>
            </ListItem>
            <ListItem key='requestAppointment' disablePadding divider >
                <ListItemButton>Request Appointment</ListItemButton>
            </ListItem>
        </List>
    )
}