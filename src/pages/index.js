import React from "react";
import { Grid, Box } from '@material-ui/core';
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
      background: 'linear-gradient(to right, rgb(241, 39, 17, 0.7), rgb(245, 175, 25, 0.7)), url("/darkbg.png");',
      backgroundSize: "cover",
      backgroundPosition: "center",        
      zIndex: '0',
      alignItems: "center",
      justifyContent: "center",
  },
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
        <Grid container>
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
