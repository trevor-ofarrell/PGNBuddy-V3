import React from "react";
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
    ResponsiveAppBar,
    SideDrawer,
} from "../components"

const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
      maxHeight: '100vh',
      overflow: 'hidden',
      background: '#121212',
      zIndex: '0',
      alignItems: "center",
      justifyContent: "center",
  },
  paper: {
      background: '#121212',
      zIndex: '2',
      width: '99vw',
      height: '92vh',
      margin: 'auto',
      marginTop: '1.5vh',
  },

}));

function dashboard() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        <ResponsiveAppBar />
        <Grid container>
            <Grid item xs={12} md={12} lg={12}>
                <Box>
                    <SideDrawer/>
                </Box>
            </Grid>
        </Grid>
    </Box>

  );
}

export default dashboard;
