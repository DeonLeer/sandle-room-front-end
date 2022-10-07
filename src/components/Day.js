import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useResponsive from "../hooks/useResponsive";
import DayExpanded from "./DayExpanded";

export default function Day({ appointments, date, expanded, setExpanded }) {


  const isDesktop = useResponsive("up", "lg");

  return appointments[date]?.length ? (
    <Box
      onClick={expanded ? () => {return} : () => setExpanded(date) }
      sx={{
        width: "100%",
        height: "10vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2">{date}</Typography>
      <Typography variant="body2">
        {appointments[date].length} app{isDesktop ? "ointment" : ""}
        {appointments[date].length != 1 ? "s" : ""}{" "}
      </Typography>
      {expanded === date && (
        <DayExpanded
          appointments={appointments[date]}
          setExpanded={setExpanded}
        />
      )}
    </Box>
  ) : (
    <Box
    onClick={expanded ? () => {return} : () => setExpanded(date) }
      sx={{
        width: "100%",
        height: "10vh",
        textAlign: "left",
      }}
    >
      {date}
      {expanded === date && (
        <DayExpanded
          appointments={appointments[date]}
          setExpanded={setExpanded}
        />
      )}
    </Box>
  );
}
