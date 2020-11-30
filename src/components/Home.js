import React from 'react';
import {
    Paper,
    withStyles,
    Grid,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Card,
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(to right, #f12711, #f5af19);',
        opacity: '0.85',
        width: '70vw',
        height: '57vh',
        marginTop: '5vh',
    },
    home: {
        border: '3px',
        margin: '3em',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bold',
        fontSize: '3.2em',
        color: 'white',
    },
    cta: {
        marginTop: '3em',
        marginLeft: '9.5vw',
        padding: '2em',
        width: '100%',
        fontSize: '1.5em',
        color: 'white'
    }
}))

const theme = createMuiTheme({
    palette: {
      primary: {main: '#FFFFFF'},
    },
  });

export const Home = () => {
    const classes = useStyles()
    return(
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <div className={classes.home}>
                            Store, view, analyze, edit your PGN files from any device, add annotations and comments, import games from lichess using the lichess.org API
                        </div>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} xl={4}/>
                    <Grid item xs={4} md={6} lg={6} xl={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.cta}
                            onClick={async () => {
                                window.location.href = '/login';
                            }}
                        >
                            Login or create an account
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={2} lg={2} xl={4}/>
                </Grid>
            </div>
        </ThemeProvider>
    )
}