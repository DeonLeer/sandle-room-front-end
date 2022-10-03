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
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function Calendar({ date }) {
    const firstDay = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-1`);
    const offSet = days.indexOf(
        firstDay.toLocaleDateString("en-US", { weekday: "long" })
    );
    const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
    const rows = [];
    let row = [];
    let i = 0;
    console.log(daysInMonth);
    while (i < daysInMonth + offSet) {
        console.log("here");
        if (i < offSet) {
            row.push(0);
            console.log(row);
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


    return (
        <>
        {rows.map((row) => (
            <TableRow sx={{height: '10vh'}}>
                {row.map((day, index) => (
                    <TableCell key={index} align='center' >{day > 0 ? day : ''}</TableCell>
                ))}
            </TableRow>
        ))}
        </>
    );
}

// const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
// ];

export default function Schedule() {
    const [date, setDate] = useState(new Date());
    // const [year, setYear] = useState(today.getFullYear());
    // const [month, setMonth] = useState(today.getMonth())
    // const [monthLong, setMonthLong] = useState(
    //     today.toLocaleDateString("en-US", { month: "long" })
    // );
    // const [date, setDate] = useState(today.getDate());
    // const [firstDay, setFirstDay] = useState(
    //     new Date(`${today.getFullYear()}-${today.getMonth() + 1}-1`)
    // );
    // const [offSet, setOffSet] = useState(
    //     days.indexOf(firstDay.toLocaleDateString("en-US", { weekday: "long" }))
    // );

    // console.log(`
    //     year: ${year}
    //     month: ${month}
    //     date: ${date}
    //     firstDay: ${firstDay}
    //     offSet: ${offSet}
    //     days in month: ${daysInMonth(month+1, year)}
    // `)

    return (
        <Box sx={{ height: "100%", backgroundColor: "grey" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {days.map((day) => (
                                <TableCell key={day} align="center">
                                    {day}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* <TableRow>
                            {days.map((day, index) => (
                                <TableCell key={index} align="center">
                                    {index < offSet ? "  " : index - offSet + 1}
                                </TableCell>
                            ))}
                        </TableRow> */}
                        {date && <Calendar date={date} />}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
