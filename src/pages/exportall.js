import React, { useRef } from 'react';
import { Grid, TextField, Button, Card } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url("/darkbg.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
      return {
        props: {"id": uid, "email": email},
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
    const [username, setUsername] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const form = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "startDate": start,
            "endDate": end,
            "user_data": {"id": props.id, "email": props.email},
        }
        await fetch('/api/exportall', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error); 
            });
            
        console.log(JSON.stringify(data))
        window.location.href = '/dashboard';
        return
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
                                    value={username}
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