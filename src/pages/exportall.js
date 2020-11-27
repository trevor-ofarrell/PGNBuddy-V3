import React, { useRef } from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Card } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import fire from '../../fire-config';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url("/checkmate.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: '100vh',
    },
    mask: {
        background: 'linear-gradient(180deg, rgba(156, 146, 156, 0.462) 20%, rgba(53, 53, 53, 0.414) 62%, rgba(0, 0, 0, 0.758) 90%)',
        width: '100vw',
        height: '100vh',
    },
    card: {
        marginTop: '40vh',
        background: 'linear-gradient(180deg, rgba(156, 146, 156, 0.462) 20%, rgba(53, 53, 53, 0.414) 62%, rgba(0, 0, 0, 0.758) 90%)',

    },
    textfield: {
        width: '100%'
    },
    button: {
        width: '100%',
        color: 'white'
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "startDate": start,
            "endDate": end,
            "user_data": {"id": props.id, "email": props.email},
        }
        fetch('/api/exportall', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error); 
            });
            
        console.log(JSON.stringify(data))
        return{redirect: {
            permanent: false,
            destination: '/dashboard',
        }}
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