import React, { useRef, useState } from 'react';
import {
  Grid, TextField, Button, Card,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import nookies from 'nookies';
import Router from 'next/router';
import { firebaseAdmin } from '../../firebaseAdmin';
import {
  NavBarLoggedIn,
} from '../components';

const useStyles = makeStyles(() => ({
  root: {
    background: 'rgb(29, 26, 24)',
    height: '100vh',
  },
  mask: {
    width: '100vw',
    height: '100%',
  },
  card: {
    marginTop: '34vh',
    background: 'linear-gradient(180deg, rgba(120, 120, 120, 0.562) 20%, rgba(83, 83, 83, 0.814) 62%, rgba(30, 30, 30, 0.958) 90%)',
  },
  textfield: {
    width: '100%',
  },
  button: {
    width: '100%',
    color: 'white',
  },
}));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { id: uid, email },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
};

const ExportPGN = (props) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [gameString, setGameString] = useState('');
  const [folder, setFolder] = useState('');
  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      folder,
      gameString,
      userData: { id: props.id, email: props.email },
    };
    await fetch('/api/lichessupload', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then((response) => { Router.push('/dashboard'); });
  };

  return (
    <section className={classes.root}>
      <NavBarLoggedIn />
      <form ref={form}>
        <Grid container className={classes.mask}>
          <Grid item xs={1} sm={1} md={3} lg={4} />
          <Grid item xs={10} sm={10} md={6} lg={4}>
            <Card className={classes.card}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="filled-password-input"
                    label="name - leave blank for default naming"
                    type="name"
                    autoComplete="name"
                    variant="filled"
                    className={classes.textfield}
                    onChange={(event) => { setName(event.target.value); }}
                    value={name}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="filled-password-input"
                    label="folder - leave blank for default naming"
                    type="folder"
                    autoComplete="folder"
                    variant="filled"
                    className={classes.textfield}
                    onChange={(event) => { setFolder(event.target.value); }}
                    value={folder}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="filled-password-input2"
                    label="Lichess game ID or link"
                    type="Lichess game ID or link"
                    autoComplete="Lichess game ID or link"
                    variant="filled"
                    className={classes.textfield}
                    onChange={(event) => { setGameString(event.target.value); }}
                    value={gameString}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Link href="/">
                  <div>
                    <Button
                      className={classes.button}
                      onClick={handleSubmit}
                    >
                      Export PGN
                    </Button>
                  </div>
                </Link>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={3} lg={4} />
        </Grid>
      </form>
    </section>
  );
};

export default ExportPGN;
