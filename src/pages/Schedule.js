import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";

const today = new Date();

const [month, setMonth] = useState(
    today.toLocaleDateString("en-US", { month: "long" })
);

const [date, setDate] = useState(today.getDate());

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const firstDay = new Date(`${today.getFullYear()}-${today.getMonth() + 1}-1`);

const offSet = days.indexOf(
    firstDay.toLocaleDateString("en-US", { weekday: "long" })
);

export default function Schedule() {
    return (
        <Box sx={{ height: "100%", backgroundColor: "grey" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {days.map((day) => (
                                <TableCell key={day}>{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {days.map((day, index) => (
                            <TableCell key={index}>
                                {index < offSet ? "" : index - offSet + 1}
                            </TableCell>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
