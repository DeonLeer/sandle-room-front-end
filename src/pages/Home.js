import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import HomeNavBar from '../components/Home/HomeNavBar';

export default function Home() {
  const theme = useTheme();
  return(
    <Container maxWidth={false} disableGutters sx={{backgroundImage: theme.backgroundImage, backgroundSize: "cover", height: '100vh'}}>
      <HomeNavBar />
    </Container>
    
  );
}