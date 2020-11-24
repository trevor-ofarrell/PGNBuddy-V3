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

const Accordion = withStyles({
  root: {
    background: 'linear-gradient(180deg, rgba(166, 166, 166, 0.462) 0%, rgba(53, 53, 53, 0.414) 22%, rgba(0, 0, 0, 0.758) 100%)',
    border: '1px solid rgba(0, 0, 0, .125)',
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
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
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

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '91.5vh',
  },
  text: {
    color: 'white',
  },
  loading: {
    justifyContent: 'center',
    height: '50vh',
    marginLeft: '32vw',
    marginTop: '30vh',
    color: 'white'
  }
}))

//   <iframe src={item.frame} width="760" height="500" frameborder="0" />

export const Accordian = (props) => {
    const classes = useStyles();
    const [gameData, setGameData] = useState({});
    const [pgns, setPgns] = useState([])
    const [expanded, setExpanded] = React.useState('panel1');

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
    fire.firestore().collection('pgns').where("user_id", "==", props.id)
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
              <Accordion TransitionProps={{ unmountOnExit: true }} key={index} expanded={expanded === 'panel' + String(index)} onChange={handleChange('panel' + String(index))}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography className={classes.text}>{pgn.name}</Typography>
                </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.text}>
                  {pgn.pgn}
                </Typography>
              </AccordionDetails>
            </Accordion>
            )) : <CircularProgress disableShrink size="40vh" thickness={1.5} className={classes.loading}/> }
        </div>
    )
}
