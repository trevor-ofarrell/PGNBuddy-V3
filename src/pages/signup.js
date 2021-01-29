import React, { useRef, useState } from 'react';
import {
  Grid, TextField, Button, Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { firebaseClient } from '../../firebaseClient';

const useStyles = makeStyles(() => ({
  root: {
    background: 'rgb(29, 26, 24)',
    height: '100vh',
  },
  mask: {
    width: '100vw',
    height: '100vh',
  },
  card: {
    marginTop: '40vh',
    background: 'linear-gradient(180deg, rgba(120, 120, 120, 0.562) 20%, rgba(83, 83, 83, 0.814) 62%, rgba(30, 30, 30, 0.958) 90%)',
  },
  textfield: {
    width: '100%',
    background: 'transparent',
  },
  button: {
    width: '100%',
    color: 'white',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [lichessUsername, setLichessUser] = useState('');
  const [pass, setPass] = useState('');
  const form = useRef(null);

  return (
    <form ref={form} className={classes.root}>
      <Grid container className={classes.mask}>
        <Grid item xs={1} sm={1} md={3} lg={4} />
        <Grid item xs={10} sm={10} md={6} lg={4}>
          <Card className={classes.card}>
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
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
                <Button
                  className={classes.button}
                  onClick={async () => {
                    const data = {
                      email,
                      username: lichessUsername,
                    };
                    await fetch('/api/saveuser', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
                    await firebaseClient
                      .auth()
                      .createUserWithEmailAndPassword(email, pass);
                    window.location.href = '/dashboard';
                  }}
                >
                  Create Account
                </Button>
              </div>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={4} />
      </Grid>
    </form>
  );
};

export default SignUp;
