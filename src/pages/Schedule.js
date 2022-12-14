import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import {
    Box,
    IconButton,
    MenuItem,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import Calendar from "../components/Calendar";
import useResponsive from "../hooks/useResponsive";
import monthList from "../utils/months";
import years from "../utils/years";

const months = monthList();

const yearList = years();

export default function Schedule() {
    const today = new Date();

    const [state, setState] = useState({
        month: today.getMonth(),
        year: today.getFullYear(),
    });

    const isDesktop = useResponsive("up", "lg")

    return (
        <Box sx={{ height: "100%", backgroundColor: "grey" }}>
            <Box
                sx={{
                    display: "flex",
                    width: isDesktop ? "50%" : "100%",
                    justifyContent: 'space-around',
                    paddingBottom: '10px'
                }}
            >
                <Box sx={{display: 'flex', justifyContent: 'space-around', width: '50%'}}>
                    <IconButton onClick={(e) => {
                        setState((prevState) => ({
                            ...prevState,
                            month: state.month ? state.month - 1 : 11,
                            ...((!state.month && state.year > 1970) && {year: state.year - 1})
                        }))
                    }}>
                        <NavigateBefore />
                    </IconButton>
                    <TextField
                        select
                        sx={{width: '75%'}}
                        value={state.month}
                        onChange={(e) => {
                            setState((prevState) => ({
                                ...prevState,
                                month: e.target.value,
                            }));
                        }}
                    >
                        {months.map((month, index) => (
                            <MenuItem key={index} value={index}>
                                {month}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton onClick={(e) => {
                        setState((prevState) => ({
                            ...prevState,
                            month: (state.month === 11) ? 0 : state.month + 1,
                            ...((state.month === 11 && state.year < 2100) && {year: state.year + 1})
                        }))
                    }}>
                        <NavigateNext />
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-around', width: '50%'}}>
                    <IconButton>
                        <NavigateBefore />
                    </IconButton>
                    <TextField
                        select
                        value={state.year}
                        onChange={(e) => {
                            setState((prevState) => ({
                                ...prevState,
                                year: e.target.value,
                            }));
                        }}
                    >
                        {yearList.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton>
                        <NavigateNext />
                    </IconButton>                    
                </Box>

            </Box>
            <Calendar month={state.month} year={state.year} />
        </Box>
    );
}
