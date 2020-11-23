import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Card } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {

    },
}))

export const Home = () => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            guh its me mario
        </div>
    )
}