import React, { useState, useEffect } from "react";
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';

import {
    ResponsiveAppBar,
    Home,
    NavBarLoggedIn,
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
  }
}));

export const getServerSideProps = async (ctx) => {
    let props = {}
    const cookies = nookies.get(ctx);
    try {
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const { uid, email } = token;
      props = {"id": uid, "email": email}
      return {props: {"id": uid, "email": email}}
    } catch (error) {
      props = {}
      return {props: {}}
    }
}

function App(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        { props.id ? <NavBarLoggedIn/> : <ResponsiveAppBar />}
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
