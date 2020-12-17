import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {
  Grid,
  CircularProgress,
  Typography,
  Divider,
} from '@material-ui/core';
import uuid from 'react-uuid';

const Accordion = withStyles({
  root: {
    background: 'rgba(58, 58, 58, 0.5)',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const PgnAccordion = withStyles({
  root: {
    background: 'rgba(12,12,12, .9)',
    boxShadow: 'none',
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
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(.8),
    }
  },
}))(MuiAccordionDetails);

 const Circle = withStyles({
  circleIndeterminate: {
   
  }
})(CircularProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    scrollbarColor: 'rgba(12, 12, 12, 0.766) rgba(58, 58, 58, 0.31)',
    scrollbarWidth: 50,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '94vh',
    width: '100%'
  },
  pgns: {
    width: '100%'
  },
  text: {
    color: 'white',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px'
    }
  },
  nogames: {
    color: 'white',
    fontSize: '3em',
    textAlign: 'center',
    paddingTop: '30vh',
    marginLeft: '-3vw',
  },
  loading: {
    justifyContent: 'center',
    color: 'white',
    marginLeft: '18vw',
    marginTop: '10vh',
    [theme.breakpoints.down('md')]: {
      marginLeft: '24vw',
      marginTop: '30vh',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '24vw',
      marginTop: '30vh',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '18vw',
      marginTop: '35vh',
    },
  },
  iframe: {
    width: '45vw',
    height: '45vh',
    [theme.breakpoints.down('lg')]: {
      width: '52vw',
      height: '50vh',
    },
    [theme.breakpoints.down('md')]: {
      width: '85vw',
      height: '42vh',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
      height: '45vh',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80vw',
      height: '33vh',
    },
  },
}))

export const Accordian = (props) => {
    const classes = useStyles();
    const [expandedFolder, setExpandedFolder] = React.useState('');
    const handleFolderChange = (panel) => (event, newExpanded) => {
      setExpandedFolder(newExpanded ? panel : false);
    };

    const [expandedPgn, setExpandedPgn] = React.useState('');
    const handlePgnChange = (panel) => (event, newExpanded) => {
      setExpandedPgn(newExpanded ? panel : false);
    };

    return props.pgns && (
        <div className={classes.root}>
          {props.folders.length !== 0 ? props.folders.map((folder, index) => (
             <>
             <Accordion
               TransitionProps={{ unmountOnExit: true }}
               expanded={expandedFolder === 'panel' + String(index)}
               onChange={handleFolderChange('panel' + String(index))}
               key={uuid()}
             >
               <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                 <FolderOpenIcon style={{fill: '#ffffff', marginRight: '1.5vw', marginTop: '2px'}}/>
                 <Typography className={classes.text}>{folder}</Typography>
               </AccordionSummary>
               <AccordionDetails>
                 <div className={classes.pgns}>
                 {props.pgns.filter((game) => { return game.folder === folder}).map((pgn, index) => (
                  <>
                  <PgnAccordion
                    TransitionProps={{ unmountOnExit: true }}
                    expanded={expandedPgn === 'panel' + String(index)}
                    onChange={handlePgnChange('panel' + String(index))}
                    key={uuid()}
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
                          <Divider style={{background: '#707070', marginBottom: '3em', marginTop: '3em'}}/>

                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </PgnAccordion>
                </>
            ))}
                 </div>
               </AccordionDetails>
             </Accordion>
           </>
            )) : <Typography className={classes.nogames}>
                  <b>No games currently</b>
                </Typography> }
        </div>
    )
}
