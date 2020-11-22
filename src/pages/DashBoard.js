import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch'

import {
    ResponsiveAppBar,
    Accordian,
} from "../components"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        backgroundImage: 'url("/checkmate.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: '0',
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        background: 'linear-gradient(180deg, rgba(166, 166, 166, 0.462) 0%, rgba(53, 53, 53, 0.414) 22%, rgba(0, 0, 0, 0.758) 100%)',
        zIndex: '2',
        width: '90vw',
        height: '85vh',
        margin: 'auto',
        marginTop: '3vh',
    },
}));

export default function DashBoard() {
    const classes = useStyles();
    return(
        <Box className={classes.root}>
            <ResponsiveAppBar />
            <Box>
                <Paper elevation={1} className={classes.paper}>
                    <Accordian/>
                </Paper>
            </Box>
        </Box>
    )
}
