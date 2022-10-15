import {
    Button,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import useResponsive from "../hooks/useResponsive";
import dayList from "../utils/days";
import monthList from "../utils/months";
import DayAvailabilities from "../components/DayAvailabilities";

const months = monthList();
const days = dayList();

const trimDate = function (object, week) {
    object.weekIndex = Number(object.startTime.split(" ")[0].split("-")[2]) - Number(week.split("-")[2]);
    object.startTime = object.startTime.split(" ")[1];
    object.endTime = object.endTime.split(" ")[1];
};

export default function RequestAppointment() {
    const today = new Date();

    const isDesktop = useResponsive("up", "lg");

    const [host, setHost] = useState(1);

    const [week, setWeek] = useState(
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate() - today.getDay())
    );

    const defaultAvailabilities = [
        { startTime: "09:00:00", endTime: "12:00:00", weekday: 1 },
        { startTime: "13:00:00", endTime: "17:00:00", weekday: 1 },
        { startTime: "09:00:00", endTime: "12:00:00", weekday: 2 },
        { startTime: "13:00:00", endTime: "17:00:00", weekday: 2 },
        { startTime: "09:00:00", endTime: "12:00:00", weekday: 3 },
        { startTime: "13:00:00", endTime: "17:00:00", weekday: 3 },
        { startTime: "09:00:00", endTime: "12:00:00", weekday: 4 },
        { startTime: "13:00:00", endTime: "17:00:00", weekday: 4 },
        { startTime: "09:00:00", endTime: "12:00:00", weekday: 5 },
        { startTime: "13:00:00", endTime: "17:00:00", weekday: 5 },
    ];

    const availabilities = [
        { startTime: "2022-10-10 17:00:00", endTime: "2022-10-10 18:30:00", available: 1 },
        { startTime: "2022-10-10 10:00:00", endTime: "2022-10-10 11:00:00", available: 0 },
        { startTime: "2022-10-13 17:00:00", endTime: "2022-10-13 19:00:00", available: 1 },
    ];

    const appointments = [
        { startTime: "2022-10-10 14:00:00", endTime: "2022-10-10 15:00:00" },
        { startTime: "2022-10-12 13:00:00", endTime: "2022-10-12 14:00:00" },
        { startTime: "2022-10-14 09:00:00", endTime: "2022-10-14 10:00:00" },
        { startTime: "2022-10-14 16:00:00", endTime: "2022-10-14 17:00:00" },
    ];

    let dailyEvents = {};

    for (let i = 0; i < 7; i++) {
        dailyEvents[i] = { appointments: [], availabilities: [], defaultAvailabilities: [] };
    }

    let timeShown = { start: 23, end: 0 };

    for (let availability of defaultAvailabilities) {
        if (Number(availability.startTime.split(":")[0]) < timeShown.start) {
            timeShown.start = Number(availability.startTime.split(":")[0]);
        }
        if (Number(availability.endTime.split(":")[0]) > timeShown.end) {
            timeShown.end = Number(availability.endTime.split(":")[0]);
        }
        dailyEvents[availability.weekday].defaultAvailabilities.push(availability);
    }

    for (let availability of availabilities) {
        trimDate(availability, week);
        if (availability.available && Number(availability.startTime.split(":")[0]) < timeShown.start) {
            timeShown.start = Number(availability.startTime.split(":")[0]);
        }
        if (availability.available && Number(availability.endTime.split(":")[0]) > timeShown.end) {
            timeShown.end = Number(availability.endTime.split(":")[0]);
        }
        dailyEvents[availability.weekIndex].availabilities.push(availability);
    }

    for (let appointment of appointments) {
        trimDate(appointment, week);
        dailyEvents[appointment.weekIndex].appointments.push(appointment);
    }

    let hours = [];

    for (let i = timeShown.start - 1; i <= timeShown.end + 1; i++) {
        hours.push(i);
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                variant='h3'
                sx={{
                    textAlign: "center",
                    marginBottom: "15px",
                }}>
                Request an Appointment
            </Typography>
            <Typography
                variant='h5'
                sx={{
                    textAlign: "center",
                    marginBottom: "15px",
                }}>
                Select an Availability Below
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button variant='contained'>Previous Week</Button>
                <Typography
                    variant='h5'
                    sx={{
                        textAlign: "center",
                        marginBottom: "15px",
                    }}>
                    Week of {`${months[Number(week.split("-")[1]) - 1]}`} {week.split("-")[2]} {week.split("-")[0]}
                </Typography>
                <Button variant='contained'>Next Week</Button>
            </Box>
            <TableContainer
                component={Paper}
                sx={{ width: "100%" }}>
                <Table
                    sx={{
                        position: "absolute",
                        ...(isDesktop ? { width: "calc(100% - 300px)" } : { width: "100%" }),
                    }}>
                    <TableHead sx={{ height: "57px", width: "100%" }}>
                        <TableRow>
                            <TableCell
                                key='time'
                                align='center'
                                sx={{ width: "9%" }}
                            />
                            {days.map((day) => (
                                <TableCell
                                    key={day}
                                    align='center'
                                    sx={{
                                        width: "13%",
                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                    }}>
                                    {isDesktop ? day : day[0]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hours.map((hour) => (
                            <TableRow
                                sx={{ height: "80px" }}
                                key={hour + "ROW"}>
                                <TableCell
                                    key={hour}
                                    sx={{
                                        width: "9%",
                                        fontSize: "0.7rem",
                                        padding: 0,
                                        verticalAlign: "top",
                                    }}>
                                    {hour < 13 ? `${hour}:00` : `${hour - 12}:00`}
                                    {hour < 12 ? `am` : `pm`}
                                </TableCell>
                                {days.map((day) => (
                                    <TableCell
                                        key={`${day}-${hour}`}
                                        sx={{
                                            width: "13%",
                                            borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                        }}></TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box
                    sx={{
                        position: "absolute",
                        ...(isDesktop ? { width: "calc(100% - 300px)" } : { width: "100%" }),
                        height: `${57 + 80 * hours.length}px`,
                        display: "flex",
                        flexDirection: "column",
                        zIndex: "100000",
                        backgroundColor: "transparent",
                    }}>
                    <Box sx={{ height: "57px" }}></Box>
                    <Box
                        sx={{
                            height: `${80 * hours.length}px`,
                            display: "flex",
                        }}>
                        <Box sx={{ width: "9%", height: "100%" }}></Box>
                        {days.map((day, index) => (
                            <DayAvailabilities
                                key={day}
                                dayIndex={index}
                                week={week}
                                dailyEvents={dailyEvents[index]}
                                hours={hours}
                            />
                        ))}
                    </Box>
                </Box>
            </TableContainer>
        </Box>
    );
}
