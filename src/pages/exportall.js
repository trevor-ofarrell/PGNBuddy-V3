// eslint no-unused-vars: ["error", { "args": "none" }]
import React, { useRef, useState } from 'react';
import {
  Grid, TextField, Button, Card,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import nookies from 'nookies';
import redis from 'redis';
import bluebird from 'bluebird';
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
    color: 'white',
  },
  button: {
    width: '100%',
    color: 'white',
  },
  label: {
    color: 'white',
    background: 'white',

  },
}));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    bluebird.promisifyAll(redis.RedisClient.prototype);
    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });
      // TODO: add hash map for finding users lichess profile
    const username = await cache.hgetAsync('users', email);
    return {
      props: { id: uid, email, username },
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

const ExportAll = (props) => {
  const classes = useStyles();
  const { username, email, id } = props;
  const [lichessUsername, setUsername] = useState(username);
  const [folder, setFolder] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      lichessUsername,
      folder,
      startDate: start,
      endDate: end,
      userData: { id, email },
    };
    await fetch('/api/exportall', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
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
                    label="User Name"
                    type="username"
                    autoComplete="username"
                    variant="filled"
                    className={classes.textfield}
                    onChange={(event) => { setUsername(event.target.value); }}
                    defaultValue={username}
                    value={lichessUsername}
                    InputLabelProps={{
                      root: classes.label,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    label="Folder - leave blank for default naming"
                    type="folder"
                    autoComplete="folder"
                    variant="filled"
                    className={classes.textfield}
                    onChange={(event) => { setFolder(event.target.value); }}
                    value={folder}
                    InputLabelProps={{
                      root: classes.label,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    label="Start Date"
                    type="date"
                    autoComplete="date"
                    variant="filled"
                    className={classes.textfield}
                    onChange={(event) => { setStart(event.target.value); }}
                    value={start}
                    color="primary"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    label="End Date"
                    type="date"
                    autoComplete="date"
                    variant="filled"
                    className={classes.textfield}
                    onChange={(event) => { setEnd(event.target.value); }}
                    value={end}
                    InputLabelProps={{ shrink: true }}
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
                      Export PGNs
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

export default ExportAll;
