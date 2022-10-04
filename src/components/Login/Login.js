import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Paper, TextField, Typography, useTheme } from '@mui/material';
import axios from 'axios';

async function loginUser(credentials) {
  console.log(credentials)
  const result = await axios.post('http://localhost:8080/login', credentials)
  return result.data[0]
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const theme = useTheme();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    console.log(token)
    setToken(token);
  }

  return(
    <Box sx={{backgroundImage: theme.backgroundImage, backgroundSize: "cover", width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Paper elevation={6} sx={{width: '50%', height: '50%', padding: '30px'}}>
        <Typography variant="h2">Please Log In</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{paddingTop: '30px', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <TextField label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
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