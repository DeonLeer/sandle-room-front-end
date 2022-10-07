import { Box, Button, List, ListItem } from "@mui/material";

export default function DayExpanded({ appointments, setExpanded }) {
  function handleClose(event) {
    setExpanded(false);
  }
  console.log(appointments)

  return (
    <Box
      sx={{
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: "100000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "50vh",
          width: "50vw",
          backgroundColor: "white",
        }}
      >
        <List>{[1, 2, 3, 4, 5].map((block) => {
            let apps = appointments.filter(appt => {
                return appt.timeBlock == block
            })
            if (apps.length == 1) {
                return (
                    <ListItem>Appointment with user {apps[0].clientUserId}</ListItem>
                )
            } else if (apps.length == 0) {
                return (<ListItem>No appointments booked</ListItem>)
            } else {
                return (<ListItem>Multiple appointments booked with {apps.map((app, index)=>{
                    if (index == 0) return `user ${app.clientUserId}`
                    else if (index !== apps.length - 1) return `, user ${app.clientUserId}`
                    else return `and user ${app.clientUserId}`
                })}</ListItem>)
            }
        })}</List>
      </Box>
      <Button variant="contained" onClick={handleClose}>
        Close
      </Button>
    </Box>
  );
}
