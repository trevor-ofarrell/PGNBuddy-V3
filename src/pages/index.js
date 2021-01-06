import React from "react";
import {
  Grid,
  Box,
  Button,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
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
      backgroundSize: "cover",
      backgroundPosition: "center",        
      zIndex: '0',
      alignItems: "center",
      justifyContent: "center",
      background: '#8E2DE2',
      background: '-webkit-linear-gradient(to right, rgb(74, 0, 224, 0.7), rgb(142, 45, 226, 0.7)), url("/darkbg.png")',
      background: 'linear-gradient(to right, rgb(74, 0, 224, 0.7), rgb(142, 45, 226, 0.7)), url("/darkbg.png")',
  },
  page: {
    opacity: '0.85',

    marginTop: '10vh',
    [theme.breakpoints.down("md")]: {
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: '5vh',
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: '5vh',
      height: '50vh',

    },
  },
  home: {
    border: '3px',
    fontFamily: 'Helvetica',
    fontSize: '4.3vh',
    color: 'white',
    background: '-webkit-linear-gradient(to right, rgb(74, 0, 224, 0.4), rgb(142, 45, 226, 0.5))',
    background: 'linear-gradient(to right, rgb(74, 0, 224, 0.4), rgb(142, 45, 226, 0.5))',
    padding: '2em',
    [theme.breakpoints.down("md")]: {
      fontSize: '5vh',
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: '4vh',
      padding: '2em',
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '3.4vh',
      padding: '2em',
    },
    
  },
  cta: {
    padding: '1.8em',
    width: '100%',
    fontSize: '1.5em',
    bottom: '1em',
    color: 'white',
    marginTop: '15vh',
    [theme.breakpoints.down("lg")]: {
    },
    [theme.breakpoints.down("md")]: {
        bottom: '1em',
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: '1.2em',
        bottom: '1em',
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: '18vh',
      fontSize: '0.8em',
      bottom: '1em',
    },
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {main: '#FFFFFF'},
  },
});

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
        { props.id && props.email ? <NavBarLoggedIn/> : <ResponsiveAppBar />}
        <Grid container>
            <Grid item xs={12} md={12} lg={12}>
                <Box>
                <ThemeProvider theme={theme}>
                  <div className={classes.page}>
                      <Grid container>
                        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/>
                        <Grid item xs={9} sm={9} md={8} lg={8} xl={8}>
                            <div className={classes.home}>
                                Store, view, analyze, and edit your PGN files from anywhere, on any device. Import games from lichess using the lichess.org API, or upload your own files.
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={3} lg={3} xl={3}/>
                      </Grid>
                  </div>
                  <Grid container>
                    <Grid item xs={1} sm={2} md={3} lg={3} xl={4}/>
                    <Grid item xs={10} sm={8} md={6} lg={6} xl={4}>
                    <Button
                            variant="outlined"
                            color="primary"
                            className={classes.cta}
                            onClick={async () => {
                                window.location.href = '/login';
                            }}
                        >
                            Login or create an account
                        </Button>
                    </Grid>
                    <Grid item xs={1} sm={2} md={3} lg={3} xl={4}/>
                  </Grid>
                </ThemeProvider>
              </Box>
            </Grid>
        </Grid>
    </Box>

  );
}

export default App;
