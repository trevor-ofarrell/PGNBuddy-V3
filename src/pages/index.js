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
    background: 'rgb(29, 26, 24)',
  },
  page: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  pagecontent: {
    paddingRight: '5em',
    maxHeight: '55vh',

    [theme.breakpoints.up('lg')]: {
      marginTop: '4.5em',
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
    borderRadius: '8px',
    fontFamily: 'Aldrich, sans-serif',
    fontSize: '3.6em',
    color: 'white',
    padding: '1em',
    marginTop: '5em',
    fontWeight: 'bold',
    background: 'rgb(29, 26, 24)',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: '1em',
      padding: '1.5em',
      fontSize: '2.75em',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '-0.5em',
      fontSize: '2.75em',
      padding: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0em',
      fontSize: '2.1em',
      padding: '0.6em',
      paddingTop: '0.5em',
      paddingBottom: '1.5em',
    },

  },
  cta: {
    padding: '1.2em',
    width: '100%',
    fontSize: '1.8em',
    color: 'white',
    borderColor: 'rgb(39, 36, 34)',
    background: 'rgb(39, 36, 34)',
    fontFamily: 'Aldrich, sans-serif',
    marginTop: '5em',
    boxShadow: '0px 0px 10px 5px #fafafa',
    '&:hover': {
      borderColor: 'rgb(59, 56, 54)',
      background: 'rgb(39, 36, 34)',
      boxShadow: '0px 0px 20px 12px #fafafa',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '11.5em',
      fontSize: '1.4em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '11vh',
      fontSize: '0.8em',
    },
  },
  logininfo: {
    zIndex: 1,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(9,6,4,1) 100%)',
    width: '100vw',
    height: '46vh',
  },
  login: {
    marginTop: '1em',
    color: 'white',
    fontFamily: 'Aldrich, sans-serif',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '1.4em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1em',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  image2: {
    zIndex: 0,
    paddingRight: '1em',
  },
  image: {
    zIndex: -1,
    paddingRight: '1em',
    paddingLeft: 'auto',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: '-3em',
      height: '40vh',
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
    return { props: { id: uid, email } };
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
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={7}>
                      <Card elevation={0} className={classes.home}>
                        Store, view, and organize your PGN files from anywhere.
                        On any device.
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={4}>
                      <div className={classes.image}>
                        <Image
                          src={pgnbuddymobile}
                          alt="picture of phone with pgnbuddy dashboard"
                          width={620.45}
                          height={725}
                          layout="intrinsic"
                          quality={100}
                          priority
                          className={classes.image2}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid container>
                    <Grid item xs={12} xl={12} className={classes.logininfo}>
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
                          <Link href="/login">
                            <Typography className={classes.login}>
                              Already have an account? Login
                            </Typography>
                          </Link>
                          <Grid item xs={1} sm={1} md={2} lg={4} xl={4} />
                        </Grid>
                      </Grid>
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
