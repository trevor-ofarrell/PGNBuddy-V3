import React, { useRef, useState } from 'react';

import {
  Grid,
  TextField,
  Button,
  Card,
  Typography,
  createTheme,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Link from 'next/link';
import Router from 'next/router';

import { firebaseClient } from '../../firebaseClient';

import {
  ResponsiveAppBar,
} from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgb(29, 26, 24)',
    height: '100vh',
    scroll: 'false',
    overflow: 'hidden',
  },
  mask: {
    width: '100vw',
    height: '100vh',
  },
  card: {
    marginTop: '36vh',
    background: 'rgb(49, 46, 44)',
    [theme.breakpoints.down('xs')]: {
      marginTop: '27vh',
    },
  },
  textfield: {
    width: '100%',
    background: 'transparent',
  },
  button: {
    width: '100%',
    color: 'white',
  },
  login: {
    color: 'white',
    fontFamily: 'Aldrich, sans-serif',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '2em',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  label: {
    color: 'rgb(119, 116, 114)',
    fontWeight: '300',
  },
  input: {
    color: '#fafafa',
    fontWeight: '300',
  },
}));

const textFieldTheme = createTheme({
  palette: {
    primary: { main: '#fafafa' },
  },
});

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [lichessUsername, setLichessUser] = useState('');
  const [pass, setPass] = useState('');
  const form = useRef(null);

  return (
    <form ref={form} className={classes.root}>
      <ResponsiveAppBar />
      <ThemeProvider theme={textFieldTheme}>
        <Grid container className={classes.mask}>
          <Grid item xs={1} sm={1} md={3} lg={4} />
          <Grid item xs={10} sm={10} md={6} lg={4}>
            <Card elevation={0} className={classes.card}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="filled-email-input"
                    label="email"
                    type="email"
                    autoComplete="email"
                    variant="filled"
                    className={classes.textfield}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    InputLabelProps={{
                      className: classes.label,
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="filled-lichessusername-input"
                    label="lichess username"
                    type="lichess username"
                    autoComplete="lichess username"
                    variant="filled"
                    className={classes.textfield}
                    value={lichessUsername}
                    onChange={(e) => setLichessUser(e.target.value)}
                    placeholder="lichess user"
                    InputLabelProps={{
                      className: classes.label,
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="filled-password-input2"
                    label="password"
                    autoComplete="password"
                    className={classes.textfield}
                    variant="filled"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Password"
                    InputLabelProps={{
                      className: classes.label,
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div>
                  <Button
                    className={classes.button}
                    onClick={async () => {
                      await firebaseClient.auth()
                        .createUserWithEmailAndPassword(email, pass).then(async (user) => {
                          const data = {
                            email,
                            username: lichessUsername,
                          };
                          const data2 = {
                            name: 'My first PGN',
                            folder: 'Welcome to PGNBuddy',
                            gameString: '69rEfo7G',
                            userData: { id: user.user.uid },
                          };
                          await fetch(
                            '/api/saveuser',
                            { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } },
                          );
                          await fetch(
                            '/api/lichessupload',
                            { method: 'POST', body: JSON.stringify(data2), headers: { 'Content-Type': 'application/json' } },
                          );
                        });
                      Router.push('/dashboard');
                    }}
                  >
                    Create Account
                  </Button>
                </div>
              </Grid>
            </Card>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Link href="/login">
                <Typography className={classes.login}>
                  Already have an account? Login.
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={1} md={3} lg={4} />
        </Grid>
      </ThemeProvider>
    </form>
  );
};

export default SignUp;
