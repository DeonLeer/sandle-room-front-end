import React from "react";
import { Box } from "@mui/material";

const numberify = function (object) {
    object.numbers = [
        Number(object.startTime.split(":")[0]) + Number(object.startTime.split(":")[1]) / 60,
        Number(object.endTime.split(":")[0]) + Number(object.endTime.split(":")[1]) / 60,
    ];
};

let blockAvailabilities = function (event, availabilities) {
    let length = availabilities.length;
    for (let i = 0; i < length; i++) {
        if (event.numbers[0] > availabilities[i][0] && event.numbers[1] < availabilities[i][1]) {
            let newAvailability = [event.numbers[1], availabilities[i][1]];
            availabilities[i][1] = event.numbers[0];
            availabilities.push(newAvailability);
        } else if (event.numbers[0] == availabilities[i][0] && event.numbers[1] < availabilities[i][1]) {
            availabilities[i][0] = event.numbers[1];
        } else if (event.numbers[0] > availabilities[i][0] && event.numbers[1] == availabilities[i][1]) {
            availabilities[i][1] = event.numbers[0];
        }
    }
};

let availabilityFilterAndSort = function (availabilities) {
    availabilities.sort((a, b) => {
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        if (a[1] > b[1]) return 1;
        if (a[1] < b[1]) return -1;
    });

    let prev;
    let length = availabilities.length;
    for (let index = 0; index < length; index++) {
        if (!prev) {
            prev = availabilities[index];
        } else {
            if (prev[1] >= availabilities[index][0]) {
                availabilities[index][0] = prev[0];
                prev = availabilities[index];
                availabilities.splice(index - 1, 1);
                index = index - 1;
                length = length - 1;
            } else {
                prev = availabilities[index];
            }
        }
    }
};

export default function DayAvailabilities({ dayIndex, week, dailyEvents, hours }) {
    for (let key in dailyEvents) {
        for (let event of dailyEvents[key]) {
            numberify(event);
        }
    }

    let availabilities = [];

    for (let availability of dailyEvents.defaultAvailabilities) {
        availabilities.push(availability.numbers);
    }

    for (let availability of dailyEvents.availabilities) {
        if (availability.available) {
            let length = availabilities.length;
            for (let i = 0; i < length; i++) {
                if (availability.numbers[0] === availabilities[i][1]) {
                    availabilities[i][1] = availability.numbers[1];
                } else if (availability.numbers[1] === availabilities[i][0]) {
                    availabilities[i][0] = availability.numbers[0];
                } else availabilities.push(availability.numbers);
            }
        }
    }
    availabilityFilterAndSort(availabilities);

    for (let availability of dailyEvents.availabilities) {
        if (!availability.available) {
            blockAvailabilities(availability, availabilities);
        }
    }
    availabilityFilterAndSort(availabilities);

    for (let appointment of dailyEvents.appointments) {
        blockAvailabilities(appointment, availabilities);
    }

    availabilityFilterAndSort(availabilities);

    let dayBlocks = []

    for (let index in availabilities) {
        if (index === '0') {
            dayBlocks.push({blocked: true, start: hours[0], end: availabilities[0][0]})
            dayBlocks.push({blocked: false, start: availabilities[0][0], end: availabilities[0][1]})
        } else {
            dayBlocks.push({blocked: true, start: availabilities[Number(index) - 1][1], end: availabilities[index][0]})
            dayBlocks.push({blocked: false, start: availabilities[index][0], end: availabilities[index][1]})
        }
    }


    return (
        <Box
            sx={{
                width: "13%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: 'center'
            }}>
            {dayBlocks.map(dayBlock => (
                <Box sx={{
                    height: `${ ( (dayBlock.end - dayBlock.start) / hours.length ) * 100 }%`,
                    width: '75%',
                    backgroundColor: dayBlock.blocked ? 'transparent' : "rgba(0, 0, 0, 0.5)",
                }}></Box>
            ))}
        </Box>
    );
}
