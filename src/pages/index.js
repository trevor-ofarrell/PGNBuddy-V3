import React from "react";
import {
  Grid,
  Box,
  Button,
  createMuiTheme,
  ThemeProvider,
  Card,
  Grow,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import {
    ResponsiveAppBar,
    Home,
    NavBarLoggedIn,
} from "../components"

import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
      backgroundSize: "cover",
      backgroundPosition: "center",        
      zIndex: '0',
      alignItems: "center",
      justifyContent: "center",
      background: 'rgb(19, 16, 14)',
    },
  section: {
    width: '100%',
    height: '95vh',
  },
  page: {
    marginTop: '17vh',
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
    borderRadius: '8px',
    fontFamily: 'Aldrich, sans-serif',
    fontSize: '4.6vh',
    color: 'white',
    padding: '1.8em',
    fontWeight: 'bold',
    background: 'radial-gradient(100% 225% at 100% 0%, #FF0000 0%, #000000 100%), linear-gradient(236deg, #00C2FF 0%, #000000 100%), linear-gradient(135deg, #CDFFEB 0%, #CDFFEB 36%, #009F9D 36%, #009F9D 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%)',
    backgroundBlendMode: 'overlay, hard-light, normal',
    [theme.breakpoints.down("md")]: {
      fontSize: '3.6vh',
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.6vh',
      padding: '2em',
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '3.4vh',
      padding: '2em',
    },
    
  },
  cta: {
    padding: '1.2em',
    width: '100%',
    fontSize: '1.8em',
    bottom: '1em',
    color: 'white',
    border: '0px',
    background: 'radial-gradient(100% 225% at 0% 0%, #DE3E3E 0%, #17115C 100%), radial-gradient(100% 225% at 100% 0%, #FF9040 0%, #FF0000 100%), linear-gradient(180deg, #CE63B7 0%, #ED6283 100%), radial-gradient(100% 120% at 75% 0%, #A74600 0%, #000000 100%), linear-gradient(310deg, #0063D8 0%, #16009A 50%)',
    backgroundBlendMode: 'overlay, color-dodge, color-burn, color-dodge, normal',
    fontFamily: 'Aldrich, sans-serif',
    marginTop: '18vh',
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
  },
  login: {
    color: 'white',    
    fontFamily: 'Aldrich, sans-serif',
    textAlign: 'center',
    cursor: 'pointer',
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

function App(props, inProp) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        { props.id && props.email ? <NavBarLoggedIn/> : <ResponsiveAppBar />}
        <section className={classes.section}>
          <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                  <Box>
                  <ThemeProvider theme={theme}>
                    <Grow
                      in={inProp}
                      style={{ transformOrigin: '2 0 -5' }}
                      {...(inProp ? { timeout: 1000 } : {})}
                    >
                      <div className={classes.page}>
                          <Grid container>
                            <Grid item xs={1} sm={1} md={1} lg={2} xl={1}/>
                            <Grid item xs={9} sm={9} md={8} lg={8} xl={8}>
                                <Card className={classes.home}>
                                  Store, view, analyze, and organize your PGN files from anywhere. On any device.
                                </Card>
                            </Grid>
                            <Grid item xs={2} sm={2} md={3} lg={2} xl={3}>
                              
                            </Grid>
                          </Grid>
                      </div>
                    </Grow>
                    <Grid container>
                      <Grid item xs={1} sm={2} md={3} lg={4} xl={4}/>
                      <Grid item xs={10} sm={8} md={6} lg={4} xl={4}>
                      <Button
                              variant="outlined"
                              color="primary"
                              className={classes.cta}
                              onClick={async () => {
                                  window.location.href = '/signup';
                              }}
                          >
                            sign up
                          </Button>
                          <Link href='/login'>
                            <Typography className={classes.login}>
                              Already have an account? Login
                            </Typography>
                          </Link>
                      </Grid>
                      <Grid item xs={1} sm={2} md={3} lg={4} xl={4}/>
                    </Grid>
                  </ThemeProvider>
                </Box>
              </Grid>
          </Grid>
        </section>
 
    </Box>

  );
}

export default App;
