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
      background: 'linear-gradient(to right, rgb(241, 39, 17, 0.7), rgb(245, 175, 25, 0.7)), url("/darkbg.png");',
      backgroundSize: "cover",
      backgroundPosition: "center",        
      zIndex: '0',
      alignItems: "center",
      justifyContent: "center",
  },
  page: {
    background: 'linear-gradient(to right, #f12711, #f5af19);',
    opacity: '0.85',
    width: '70vw',
    marginTop: '5vh',
    height: '100%',
    [theme.breakpoints.down("md")]: {
        height: '100%',
    },
    [theme.breakpoints.down("sm")]: {
        height: '100%',
    },
    [theme.breakpoints.down("xs")]: {
        height: '100%',
    },
  },
  home: {
    border: '3px',
    margin: '2.9em',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '3.2em',
    color: 'white',
    [theme.breakpoints.down("md")]: {
        fontSize: '3.1em',
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: '2.3em',
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: '1.5em',
        margin: '1.9em',
    },
    
  },
  cta: {
    padding: '2em',
    width: '100%',
    fontSize: '1.5em',
    bottom: '1em',
    color: 'white',
    marginTop: '20vh',
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
        { props.id ? <NavBarLoggedIn/> : <ResponsiveAppBar />}
        <Grid container>
            <Grid item xs={12} md={12} lg={12}>
                <Box>
                <ThemeProvider theme={theme}>
                  <div className={classes.page}>
                      <Grid container>
                          <Grid item xs={12} md={12} lg={12} xl={12}>
                              <div className={classes.home}>
                                  Store, view, analyze, and edit your PGN files from anywhere, on any device, import games from lichess using the lichess.org API, or upload your own files.
                              </div>
                          </Grid>

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
