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
import nookies from 'nookies';
import Link from 'next/link';
import { firebaseAdmin } from '../../firebaseAdmin';

import {
  ResponsiveAppBar,
  NavBarLoggedIn,
} from '../components';

//  TODO add nav bar to login/signup pages

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: '0',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(29, 26, 24)',
    height: '100vh',
    width: '100vw',
  },
  page: {
    marginTop: '17vh',
    [theme.breakpoints.down('md')]: {
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '5vh',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '5vh',
      height: '50vh',

    },
  },
  home: {
    borderRadius: '8px',
    fontFamily: 'Aldrich, sans-serif',
    fontSize: '3.6em',
    color: 'white',
    padding: '1.8em',
    fontWeight: 'bold',
    background: 'rgb(39, 36, 34)',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.75em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.75em',
      padding: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.1em',
      padding: '0.6em',
      paddingTop: '1.5em',
      paddingBottom: '1.5em',
      marginTop: '0.5em',
    },

  },
  cta: {
    padding: '1.2em',
    width: '100%',
    fontSize: '1.8em',
    bottom: '1em',
    color: 'white',
    borderColor: 'rgb(39, 36, 34)',
    background: 'rgb(39, 36, 34)',
    fontFamily: 'Aldrich, sans-serif',
    marginTop: '18vh',
    '&:hover': {
      borderColor: 'rgb(59, 56, 54)',
    },
    [theme.breakpoints.down('lg')]: {
    },
    [theme.breakpoints.down('md')]: {
      bottom: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      bottom: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '15vh',
      fontSize: '0.8em',
      bottom: '1em',
    },
  },
  login: {
    color: 'white',
    fontFamily: 'Aldrich, sans-serif',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFFFFF' },
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
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Box>
              <ThemeProvider theme={theme}>
                <div className={classes.page}>
                  <Grid container>
                    <Grid item xs={1} sm={1} md={2} lg={2} xl={2} />
                    <Grid item xs={10} sm={10} md={8} lg={8} xl={8}>
                      <Card className={classes.home}>
                        Store, view, and organize your PGN files from anywhere.
                        On any device.
                      </Card>
                    </Grid>
                    <Grid item xs={1} sm={1} md={2} lg={2} xl={2} />
                  </Grid>
                </div>
                <Grid container>
                  <Grid item xs={1} sm={2} md={3} lg={4} xl={4} />
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
                    <Link href="/login">
                      <Typography className={classes.login}>
                        Already have an account? Login
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={1} sm={2} md={3} lg={4} xl={4} />
                </Grid>
              </ThemeProvider>
            </Box>
          </Grid>
        </Grid>
      </Grow>
    </div>
  );
}

export default App;
