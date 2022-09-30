import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';

async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <Box sx={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Paper elevation={6} sx={{width: '50%', height: '50%', padding: '30px'}}>
        <Typography variant="h2">Please Log In</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{paddingTop: '30px', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <TextField label="Email" variant="outlined" onChange={e => setUserName(e.target.value)} />
          <TextField label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} />
          <Button variant='contained' sx={{color: 'black'}} type="submit">Submit</Button>
        </Box>
      </Paper>
    </Box>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};