import React from 'react';
import { Box, Grid, Typography } from '@mui/material'

export default function Home() {
  return(
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Welcome to Sandle Room</Typography>
      </Grid>
    </Grid>
  );
}