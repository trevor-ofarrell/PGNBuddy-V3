import React from 'react';
import {
    Grid,
    Button,
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(to right, #f12711, #f5af19);',
        opacity: '0.85',
        width: '70vw',
        marginTop: '5vh',
        [theme.breakpoints.down("md")]: {
            height: '52em',
        },
        [theme.breakpoints.down("sm")]: {
            height: '100%',
        },
        [theme.breakpoints.down("xs")]: {
            height: '28em',
        },
    },
    home: {
        border: '3px',
        margin: '2.9em',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bold',
        fontSize: '3.2em',
        color: 'white',
        [theme.breakpoints.down("md")]: {
            fontSize: '3.1em',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '2.3em',
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '1.5em',
            margin: '1.9em',
        },
        
    },
    cta: {
        marginLeft: '9.5vw',
        padding: '2em',
        width: '100%',
        fontSize: '1.5em',
        bottom: '10vw',
        color: 'white',
        [theme.breakpoints.down("lg")]: {
            bottom: '10vw',
        },
        [theme.breakpoints.down("md")]: {
            bottom: '10vw',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '1.2em',
            bottom: '1vw',
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '0.8em',
            bottom: '10vw',
        },
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
                            Store, view, analyze, and edit your PGN files from anywhere, on any device, import games from lichess using the lichess.org API, or upload your own files.
                        </div>
                    </Grid>
                    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}/>
                    <Grid item xs={10} sm={8} md={6} lg={6} xl={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.cta}
                            onClick={async () => {
                                window.location.href = '/login';
                            }}
                        >
                            create an account
                        </Button>
                    </Grid>
                    <Grid item sm={1} md={2} lg={2} xl={4}/>
                </Grid>
            </div>
        </ThemeProvider>
    )
}