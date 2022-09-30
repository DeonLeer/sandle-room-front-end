import { Box, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";

export default function SideBar(props) {
    const page = props.page;
    const setPage = props.setPage;

    return (
        <List disablePadding component={Box} sx={{ width: '200px', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <ListItem key='overview' disablePadding divider >
                <ListItemButton onClick={() => setPage('overview')}>Overview</ListItemButton>
            </ListItem>
            <ListItem key='appointments' disablePadding divider >
                <ListItemButton onClick={() => setPage('appointments')}>Appointments</ListItemButton>
            </ListItem>
            <ListItem key='requestAppointment' disablePadding divider >
                <ListItemButton onClick={() => setPage('requestAppointment')}>Request Appointment</ListItemButton>
            </ListItem>
        </List>
    )
}