import {
    Box,
    List,
    ListItem,
    ListItemButton,
    Drawer,
    Typography,
    Avatar,
    Stack,
    styled,
} from "@mui/material";
import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import Iconify from "../../components/Iconify";
import { UserContext } from "../../App";

const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        flexShrink: 0,
        width: 280,
    },
}));

SideBar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
};

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;


export default function SideBar({ isOpenSidebar, onCloseSidebar }) {
    const { pathname } = useLocation();

    const isDesktop = useResponsive("up", "lg");

    const userContext = useContext(UserContext);

    const isAdmin = userContext.user.roles?.includes(2)

    const navConfig = [
        {
            title: "dashboard",
            path: "/dashboard",
            icon: getIcon("eva:pie-chart-2-fill"),
        },
        {
            title: "schedule",
            path: "/dashboard/schedule",
            icon: getIcon("ant-design:schedule-outlined"),
        },
        {
            title: "appointments",
            path: "/dashboard/appointments",
            icon: getIcon("teenyicons:appointments-outline"),
        },
        ...isAdmin ? 
           [ {
                title: "appointment requests",
                path: "/dashboard/appointmentrequests",
                icon: getIcon("ic:baseline-schedule-send"),
            }] :
            [{
                title: "request appointment",
                path: "/dashboard/requestappointment",
                icon: getIcon("ic:baseline-schedule-send"),
            }],
        {
            title: "preferences",
            path: "/dashboard/preferences",
            icon: getIcon("healthicons:ui-preferences"),
        },
    ];

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
    }, [pathname]);

    const content = (
        <Scrollbar
            sx={{
                height: 1,
                "& .simplebar-content": {
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Box
                sx={{
                    px: 2.5,
                    py: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img src="logo.png" />
            </Box>
            <NavSection navConfig={navConfig} />
        </Scrollbar>
    );

    return (
        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: 280 },
                    }}
                >
                    {content}
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 280,
                            bgcolor: "background.default",
                            borderRightStyle: "dashed",
                        },
                    }}
                >
                    {content}
                </Drawer>
            )}
        </RootStyle>
    );
}
