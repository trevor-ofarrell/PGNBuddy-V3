import React, { useState, useEffect } from "react";
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

import {
    ResponsiveAppBar,
    Home,
} from "../components"

const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#121212',
      zIndex: '0',
      alignItems: "center",
      justifyContent: "center",
  },
  home: {
      padding: '4em'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        <ResponsiveAppBar />
        <Grid container className={classes.home}>
            <Grid item xs={12} md={12} lg={12}>
                <Box>
                    <Home/>
                </Box>
            </Grid>
        </Grid>
    </Box>

  );
}

export default App;
