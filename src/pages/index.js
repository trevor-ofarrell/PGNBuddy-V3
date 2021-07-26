import React from 'react';
import {
  Grid,
  Box,
  Button,
  createMuiTheme,
  ThemeProvider,
  Card,
  Grow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';

import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';

import {
  ResponsiveAppBar,
  NavBarLoggedIn,
} from '../components';

import pgnbuddymobile from '../../public/pgnbuddymobile.png';

//  TODO add nav bar to login/signup pages

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    maxHeight: '100vh',
    background: 'rgb(29, 26, 24)',
    overflow: 'hidden',
  },
  page: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  pagecontent: {
    paddingRight: '5em',
    maxHeight: '100vh',
    [theme.breakpoints.up('lg')]: {
      marginTop: '5em',
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: '0em',
    },
    [theme.breakpoints.down('sm')]: {
    },
    [theme.breakpoints.down('xs')]: {
      height: '50vh',
    },
  },
  home: {
    zIndex: 2,
    fontFamily: 'Aldrich, sans-serif',
    fontSize: '3.6em',
    padding: '1em',
    fontWeight: 'bold',
    color: 'white',
    marginTop: 'auto',
    marginBottom: 'auto',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      margin: 'auto',
      padding: '1.5em',
      fontSize: '3.5em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.75em',
      padding: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em',
      padding: '1em',
    },

  },
  cta: {
    zIndex: 1,
    padding: '1.2em',
    width: '100%',
    fontSize: '1.8em',
    color: 'white',
    background: 'rgb(39, 36, 34)',
    fontFamily: 'Aldrich, sans-serif',
    marginTop: '5em',
    boxShadow: '0px 0px 100px 120px rgb(29, 26, 24)',
    position: 'relative',
    '&:hover': {
      borderColor: 'rgb(59, 56, 54)',
      background: 'rgb(39, 36, 34)',
      boxShadow: '0px 0px 20px 20px rgb(29, 26, 24)',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '3vh',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8em',
    },
  },
  login: {
    zIndex: 2,
    marginTop: '1em',
    color: 'white',
    fontFamily: 'Aldrich, sans-serif',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '1.4em',
    marginRight: 'auto',
    marginLeft: 'auto',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1em',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  image2: {
    zIndex: 0,
    bottom: '25vh',
    height: '70%',
    margin: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('md')]: {
      height: '60%',
      top: '58%',
      bottom: '0vh',
    },
  },
  image: {
    marginTop: 'auto',
    marginBottom: 'auto',
    zIndex: 0,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      height: '40vh',
      marginTop: 'auto',
      marginBottom: '0em',
    },
  },
  f: {
    marginTop: 'auto',
    marginBottom: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: '3vh',
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFFFFF' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1660,
      xl: 2150,
    },
  },
});

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  try {
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
      props: {},
    };
  } catch (error) {
    return { props: {} };
  }
};

function App(props, inProp = true) {
  const classes = useStyles();
  const { id, email } = props;

  return (
    <div className={classes.root}>
      { id && email ? <NavBarLoggedIn /> : <ResponsiveAppBar />}
      <Grow
        in
        style={{ transformOrigin: '2 0 -5' }}
        {...(inProp ? { timeout: 1000 } : {})}
      >
        <Grid container className={classes.page}>
          <Grid item xs={12} md={12} lg={12}>
            <Box>
              <ThemeProvider theme={theme}>
                <div className={classes.pagecontent}>
                  <Grid container>
                    <Grid item lg={1} xl={1} />
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={7} className={classes.f}>
                      <div className={classes.home}>
                        Store, view, and organize your PGN files from anywhere.
                        On any device.
                      </div>
                      <Grid container>
                        <Grid item xs={1} sm={1} md={2} lg={4} xl={4} />
                        <Grid item xs={10} sm={10} md={8} lg={4} xl={4}>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.cta}
                            onClick={async () => {
                              Router.push('/signup');
                            }}
                          >
                            sign up
                          </Button>

                          <Grid item xs={1} sm={1} md={2} lg={4} xl={4} />
                        </Grid>
                      </Grid>
                      <Link href="/login">
                        <Typography className={classes.login}>
                          Already have an account? Login
                        </Typography>
                      </Link>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={5} xl={4}>
                      <div className={classes.image}>
                        <img
                          src={pgnbuddymobile}
                          alt="phone with pgnbuddy dashboard"
                          className={classes.image2}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </ThemeProvider>
            </Box>
          </Grid>
        </Grid>
      </Grow>
    </div>
  );
}

export default App;
