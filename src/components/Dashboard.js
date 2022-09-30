import React, { useState } from 'react';

// import Appointment from './Dashboard/Appointment'
import Appointments from './Dashboard/Appointments'
import NavBar from './Dashboard/NavBar'
import Overview from './Dashboard/Overview'
import SideBar from './Dashboard/SideBar'
import RequestAppointment from './Dashboard/RequestAppointment'
import { Box } from '@mui/material';

export default function Dashboard(props) {

  const [page, setPage] = useState('overview')

  const logout = props.logout;

  function updatePage(page) {
    setPage(page)
  }

  return(
    <Box sx={{width: '100vw'}}>
      <NavBar logout={logout}/>
      <Box sx={{display: 'flex', flexDirection: 'row', paddingTop: '64px', width: '100vw'}}>
        <SideBar page={page} setPage={updatePage}/>
        {
          {
            'overview': <Overview />,
            'appointments': <Appointments />,
            'requestAppointment': <RequestAppointment />
          }[page]
        }
      </Box>
    </Box>
  );
}