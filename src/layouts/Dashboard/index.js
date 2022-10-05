import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// import Appointment from './Dashboard/Appointment'
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Box, useTheme } from "@mui/material";

export default function DashboardLayout(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex", minHeight: "100%", overflow: "hidden" }}>
            <NavBar onOpenSidebar={() => setOpen(true)} />
            <SideBar
                isOpenSidebar={open}
                onCloseSidebar={() => setOpen(false)}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: "auto",
                    minHeight: "100%",
                    paddingTop: "88px",
                    paddingBottom: "80px",
                    [theme.breakpoints.up("lg")]: {
                        paddingTop: "116px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                    },
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
