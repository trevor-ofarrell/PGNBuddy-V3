import React, { useRef } from 'react';
import { Grid, TextField, Button, Card } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';


const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(to right, rgb(241, 39, 17, 0.7), rgb(245, 175, 25, 0.7)), url("/darkbg.png");',
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

const ExportPGN = (props) => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [gameString, setGameString] = useState("");
    const [folder, setFolder] = useState("");
    const form = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "name": name,
            "folder": folder,
            "game_string": gameString,
            "user_data": {"id": props.id, "email": props.email},
        }
        await fetch('/api/lichessupload', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
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
                                    id="filled-password-input"
                                    label="name"
                                    type="name"
                                    autoComplete="name"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setName(event.target.value)}}
                                    value={name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="filled-password-input"
                                    label="folder"
                                    type="folder"
                                    autoComplete="folder"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setFolder(event.target.value)}}
                                    value={folder}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="filled-password-input2"
                                    label="gamestring"
                                    type="gamestring"
                                    autoComplete="gamestring"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setGameString(event.target.value)}}
                                    value={gameString}
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
                                        Export PGN
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

export default ExportPGN;
