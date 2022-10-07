import React, { useState, useContext, useCallback, useEffect } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { UserContext } from "../App";
import appointmentService from '../services/appointment.service'
import Day from "./Day";
import useResponsive from "../hooks/useResponsive";

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const getRows = function (month, year) {
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
    return {rows, offSet}
}
export default function Calendar({ month, year }) {

    const [appointments, setAppointments] = useState({})

    const [expanded, setExpanded] = useState(false);

    const userContext = useContext(UserContext);

    const appointmentRoutes = appointmentService();

    const isDesktop = useResponsive("up", "lg")

    const isAdmin = userContext.user?.roles?.includes(2)

    const getAppointmentCallback = isAdmin ? appointmentRoutes.getAdminAppointments : appointmentRoutes.getUserAppointments

    const getAppointments = useCallback(async () => {
        try {
            const response = await getAppointmentCallback();
            const appointmentsObject = {}
            let day;
            response.data.map((appointment) => {
                day = Number(appointment.date.split('-')[2].split('T')[0])
                appointmentsObject[day] ? appointmentsObject[day].push(appointment) : appointmentsObject[day] = [appointment]
            })
            setAppointments(appointmentsObject)
        } catch (err) {
            console.log(err)
        }
    })

    useEffect(() => {
        getAppointments();
    }, [])



    const {rows, offSet} = getRows(month, year)
    

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
                                {isDesktop ? day : day[0]}
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
                                    sx={
                                        index
                                            ? {
                                                borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                width: "14.2857%",
                                                padding: "8px",
                                                height: '100%'
                                              }
                                            : { width: "14.2857%", padding: "8px", height: '100%'  }
                                    }
                                >
                                    {day > 0 ? 
                                        <Day appointments={appointments} date={day} expanded={expanded} setExpanded={setExpanded} />
                                    : ""}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
