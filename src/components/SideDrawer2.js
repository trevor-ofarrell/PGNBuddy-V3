import React, { useState } from 'react';
import {
    createStyles,
    Theme,
    makeStyles,
    Drawer,
    CssBaseline,
    Typography,
    Button,
    Box,
} from '@material-ui/core';

const drawerWidth = '22vw';

const useStyles = makeStyles((theme) => ({
    drawer: {
    width: drawerWidth,
    flexShrink: 0,
    },
    drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f1f3f4",
    height: 'calc(100% - 8vh)',
    top: '8vh',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    toolbarText: {
        padding: '1.6em',
        marginTop: ".5em",
        fontSize: "16px",
        letterSpacing: '0.8px',
        color: "#262626",
        fontWeight: 600,
        textAlign: 'center',
        fontFamily: 'Red Hat Display',
        width: '100%',
    },
}))

export const SideDrawer2 = () => {
    const classes = useStyles()
    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
            paper: classes.drawerPaper,
        }}
        anchor="left"
        >
        <div className={classes.toolbar}>
            <Typography variant='h6' className={classes.toolbarText}>
                ORGANIZATION DETAILS
            </Typography>
        </div>
            guhuuhuhuhuusupiug
        </Drawer>
    )
}