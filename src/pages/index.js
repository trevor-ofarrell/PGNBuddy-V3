import React from 'react';
import {
  Grid,
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Card,
  Grow,
  Fade,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'next/link';
import Router from 'next/router';

import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';

import {
  ResponsiveAppBar,
  NavBarLoggedIn,
} from '../components';

import useWindowSize from '../hooks/useWindowSize';

import pgnbuddymobile from '../../public/pgnbuddymobile.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    background: 'rgb(29, 26, 24)',
    overflow: 'hidden',
  },
  page: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  home: {
    zIndex: 2,
    width: '70%',
    fontFamily: 'Aldrich, sans-serif',
    fontSize: '3.6em',
    padding: '1em',
    fontWeight: 'bold',
    color: 'white',
    background: 'rgb(39, 36, 34, 0.85)',
    margin: 'auto',
    position: 'relative',
    textAlign: 'center',
    textShadow: '2px 2px rgb(29, 26, 24)',
    userSelect: 'none',
    [theme.breakpoints.down('md')]: {
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
  hwrapper: {
    marginTop: '10vh',
    [theme.breakpoints.down('xs')]: {
      marginTop: '6vh',
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
    width: '100%',
    color: 'white',
    fontFamily: 'Aldrich, sans-serif',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '1.4em',
    marginRight: 'auto',
    marginLeft: 'auto',
    position: 'relative',
    userSelect: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1em',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  image: {
    zIndex: 0,
    position: 'absolute',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '95vw',
      maxHeight: '80vh',
    },

  },
  imagewrapper: {
    zIndex: 0,
    textAlign: 'center',
  },
}));

const theme = createTheme({
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
  const size = useWindowSize();
  const { id, email } = props;

  return (
    <div className={classes.root} style={{ height: size.height }}>
      { id && email ? <NavBarLoggedIn /> : <ResponsiveAppBar />}
      <Grow
        in
        style={{ transformOrigin: '2 0 -5' }}
        {...(inProp ? { timeout: 1000 } : {})}
      >
        <ThemeProvider theme={theme}>
          <div className={classes.page}>
            <Grid container>
              <Grid item lg={1} xl={1} />
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.hwrapper}>
                <Card className={classes.home}>
                  Store, view, and organize your PGN files from anywhere.
                  On any device.
                </Card>
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
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={classes.imagewrapper}>
                  <img
                    src={pgnbuddymobile}
                    alt="phone with pgnbuddy dashboard"
                    className={classes.image}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </ThemeProvider>
      </Grow>
    </div>
  );
}

export default App;
