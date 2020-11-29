import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { color } from '@material-ui/system';
import fire from '../../fire-config';
import { Paper, Grid, TextField, Button, FormControlLabel, Checkbox, Card } from '@material-ui/core';

const Accordion = withStyles({
  root: {
    background: 'linear-gradient(180deg, rgba(50, 50, 50, 0.85) 25%, rgba(33, 33, 33, 0.95) 50%, rgba(0, 0, 0, 0.958) 100%)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

 const Circle = withStyles({
  circleIndeterminate: {
   
  }
})(CircularProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '89vh',
  },
  text: {
    color: 'white',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px'
    }
  },
  loading: {
    justifyContent: 'center',
    height: '50vh',
    marginLeft: '32vw',
    marginTop: '30vh',
    color: 'white'
  },
  iframe: {
    width: '62vw',
    height: '55vh',
    [theme.breakpoints.down('lg')]: {
      width: '56vw',
      height: '60vh',
    },
    [theme.breakpoints.down('md')]: {
      width: '88vw',
      height: '48vh',
    },
    [theme.breakpoints.down('sm')]: {
      width: '88vw',
      height: '45vh',
    },
  },
}))

export const Accordian = (props) => {
    const classes = useStyles();
    const [gameData, setGameData] = useState({});
    const [pgns, setPgns] = useState([])
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    useEffect( () => {
      let mounted = true;
      if (mounted) {
        getTodos()
      }
      return () => mounted = false;
    }, [])

  const getTodos = () => {
    console.log(props.id)
    console.log(props.user)
    fire.firestore().collection(`${props.id}-pgns`)
      .get()
      .then(querySnapshot => {
      querySnapshot.forEach( doc => {
        setPgns(prev => ([...prev, doc.data()]))
      })
    })
    .catch(err => {
      console.log(err.message)
    })
  }



    return gameData && (
        <div className={classes.root}>
            {pgns.length !== 0 ? pgns.map((pgn, index) => (
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                key={index}
                expanded={expanded === 'panel' + String(index)}
                onChange={handleChange('panel' + String(index))}
              >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography className={classes.text}>{pgn.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                      <iframe src={pgn.iframe} loading="lazy" className={classes.iframe} frameBorder="0"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                      <Typography className={classes.text}>
                        <b>Event: </b> {pgn.rated == true ? "Rated" : "Unrated"} {pgn.speed} game
                      </Typography>
                      <Typography className={classes.text}>
                        <b>Variant: </b> {pgn.variant}
                      </Typography>
                      <Typography className={classes.text}>
                        <b>Winner: </b> {pgn.winner}
                      </Typography>
                      <Typography className={classes.text}>
                        <b>Black: </b> {pgn.players.black.user.name} {pgn.players.black.rating}
                      </Typography>
                      <Typography className={classes.text}>
                        <b>White: </b> {pgn.players.white.user.name} {pgn.players.white.rating}
                      </Typography>
                      <Typography className={classes.text}>
                        <b>Rating difference: </b> {pgn.players.white.ratingDiff}
                      </Typography>
                      <Typography className={classes.text}>
                        <b>Game status: </b> {pgn.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <br/>
                      <Typography className={classes.text}>
                        <b>Moves: </b> {pgn.moves}
                      </Typography>
                      <br/>
                      <Typography className={classes.text}>
                        <b>PGN: </b> {pgn.pgn}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )) : <Circle size="40vh" thickness={1.5} className={classes.loading}/> }
        </div>
    )
}
