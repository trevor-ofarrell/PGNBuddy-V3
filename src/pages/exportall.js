import React, { useRef } from 'react';
import { Grid, TextField, Button, Card } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import redis from 'redis';
import bluebird, { props } from 'bluebird';

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'rgb(39, 36, 33)',
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
        color: 'white'
    },
    button: {
        width: '100%',
        color: 'white'
    },
    label: {
        color: 'white',
        background: 'white'

    }
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
      //TODO: add hash map for finding users lichess profile
      const username = await cache.hgetAsync('users', email)
      console.log(username)
      return {
        props: {"id": uid, "email": email, 'username': username},
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

  const exportAll = (props) => {
    const classes = useStyles();
    const [username, setUsername] = useState(props.username);
    const [folder, setFolder] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const form = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "folder": folder,
            "startDate": start,
            "endDate": end,
            "user_data": {"id": props.id, "email": props.email},
        }
        await fetch('/api/exportall', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
            .then(async () => {
                return window.location.href = '/dashboard';
            })
    }

    return (
        <form ref={form} className={classes.root}>
            <Grid container className={classes.mask}>
                <Grid item xs={1} sm={1} md={3} lg={4}/>
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
                                    onChange={(event) => {setUsername(event.target.value)}}
                                    defaultValue={props.username}
                                    value={username}
                                    InputLabelProps={{
                                        root: classes.label
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
                                    onChange={(event) => {setFolder(event.target.value)}}
                                    value={folder}
                                    InputLabelProps={{
                                        root: classes.label
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
                                    onChange={(event) => {setStart(event.target.value)}}
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
                                    onChange={(event) => {setEnd(event.target.value)}}
                                    value={end}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Link href='/'>
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
                <Grid item xs={1} sm={1} md={3} lg={4}/>
            </Grid>
        </form>
    );
}

export default exportAll;
