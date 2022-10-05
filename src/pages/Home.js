import React, { useContext } from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import HomeNavBar from '../components/Home/HomeNavBar';
import { UserContext } from '../App';

export default function Home({user}) {
  const userContext = useContext(UserContext);
  const theme = useTheme();
  return(
    <Container maxWidth={false} disableGutters sx={{backgroundImage: theme.backgroundImage, backgroundSize: "cover", height: '100vh'}}>
      <HomeNavBar user={userContext.user}/>
    </Container>
  );
}