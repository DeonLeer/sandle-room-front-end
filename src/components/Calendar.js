import React, { useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

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

export default function Calendar({ month, year }) {
    const firstDay = new Date(`${year}-${month + 1}-1`);
    const offSet = days.indexOf(
        firstDay.toLocaleDateString("en-US", { weekday: "long" })
    );
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const rows = [];
    let row = [];
    let i = 0;
    while (i < daysInMonth + offSet) {
        if (i < offSet) {
            row.push(0);
            i++;
        } else {
            row.push(i + 1 - offSet);
            if ((i + 1) % 7 === 0) {
                rows.push(row);
                row = [];
                i++;
            } else i++;
        }
    }
    if (row.length) rows.push(row);
    if (rows[rows.length - 1].length < 7) {
        let j = 0;
        let offSetEnd = 7 - rows[rows.length - 1].length;
        while (j < offSetEnd) {
            rows[rows.length - 1].push(0);
            j++;
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableHead sx={{ minWidth: "100%" }}>
                    <TableRow sx={{ minWidth: "100%" }}>
                        {days.map((day) => (
                            <TableCell
                                key={day}
                                align="center"
                                sx={{ width: "14.2857%" }}
                            >
                                {day}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            sx={{ height: "10vh", minWidth: "100%" }}
                        >
                            {row.map((day, index) => (
                                <TableCell
                                    key={day > 0 ? day : 0 - offSet + index}
                                    align="center"
                                    sx={
                                        index
                                            ? {
                                                  borderLeft:
                                                      "1px solid rgba(224, 224, 224, 1)",
                                                  width: "14.2857%",
                                              }
                                            : { width: "14.2857%" }
                                    }
                                >
                                    {day > 0 ? day : ""}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
