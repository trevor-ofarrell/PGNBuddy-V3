import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {
  Grid,
  Typography,
  Card,
  Button,
} from '@material-ui/core';
import uuid from 'react-uuid';
import { DeleteFolderModal, DeletePgnModal } from '.';

// TODO: style 'no games currently' notifcation and mobile menu, as well as fix sizing for mobile

const Accordion = withStyles({
  root: {
    background: 'rgb(29, 26, 24)',
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
    background: 'rgb(29, 26, 24)',
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
    background: 'rgb(59, 56, 54)',
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

const PgnAccordionSummary = withStyles({
  root: {
    background: 'rgb(49, 46, 44)',
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
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.8),
    },
  },
}))(MuiAccordionDetails);

const PgnAccordionDetails = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingRight: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.1),
    },
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    scrollbarColor: 'rgba(12, 12, 12, 0.766) rgba(58, 58, 58, 0.31)',
    scrollbarWidth: 50,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '94vh',
    width: '100%',
  },
  pgns: {
    width: '100%',
  },
  text: {
    color: 'white',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px',
    },
  },
  foldertext: {
    color: 'white',
    width: '89%',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px',
      width: '91.5%',
    },
  },
  pgntext: {
    color: 'white',
    width: '92%',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px',
      width: '93.25%',
    },
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
    [theme.breakpoints.up('xl')]: {
      width: '37vw',
    },
    [theme.breakpoints.down('lg')]: {
      width: '50vw',
      height: '50vh',
    },
    [theme.breakpoints.down('md')]: {
      width: '85vw',
      height: '42vh',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
      height: '42vh',
    },
    [theme.breakpoints.down('xs')]: {
      width: '95.5vw',
      height: '32.25vh',
    },
  },
  pgncontent: {
    marginBottom: '0em',
    marginTop: '2em',
    [theme.breakpoints.up('xl')]: {
      marginLeft: '1vw',
      marginRight: '1vw',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: '3vw',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '-1vw',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-1.5vw',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '1em',
      marginBottom: '1em',
      marginLeft: '0.2vw',

    },
  },
  iframecard: {
    background: 'rgb(49, 46, 44)',
    padding: '2em',
    [theme.breakpoints.up('lg')]: {
      marginRight: '2vw',
    },
    [theme.breakpoints.down('md')]: {
      padding: '1em',
      marginBottom: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0em',
      marginBottom: '1em',
    },
  },
  pgncard: {
    background: 'rgb(49, 46, 44)',
    padding: '2em',
    marginTop: '2em',
    marginBottom: '2em',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '1em',
      marginBottom: '1em',
    },
  },
  pgninfocard: {
    background: 'rgb(49, 46, 44)',
    padding: '1em',
    paddingTop: '2em',
    height: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
  },
  link: {
    textDecoration: 'underline white',
  },
  button: {
    color: 'white',
    borderColor: 'white',
    marginTop: '1vh',
  },
}));

export const Accordian = (props) => {
  const classes = useStyles();

  const { pgns, folders, id } = props;

  const [expandedPgn, setExpandedPgn] = React.useState('');

  const [expandedFolder, setExpandedFolder] = React.useState('');

  const handleFolderChange = (panel) => (event, newExpanded) => {
    setExpandedFolder(newExpanded ? panel : false);
  };

  const handlePgnChange = (panel) => (event, newExpanded) => {
    setExpandedPgn(newExpanded ? panel : false);
  };

  return pgns && (
    <div className={classes.root}>
      {folders.length !== 0 ? folders.map((folder, i) => (
        <React.Fragment key={`folder-${uuid()}-${i}`}>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            expanded={expandedFolder === `panel${String(i)}`}
            onChange={handleFolderChange(`panel${String(i)}`)}
          >
            <AccordionSummary aria-controls={`panel${i}a-content`} id={`panel${i}a-content`}>
              <FolderOpenIcon style={{ fill: '#ffffff', marginRight: '1.5vw', marginTop: '2px' }} />
              <Typography className={classes.foldertext}>{folder}</Typography>
              <DeleteFolderModal folderName={folder} id={id} />
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.pgns}>
                {pgns.filter((game) => game.folder === folder).map((pgn, j) => (
                  <React.Fragment key={`pgn-${uuid()}-${j}`}>
                    <PgnAccordion
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expandedPgn === `panel${String(j)}`}
                      onChange={handlePgnChange(`panel${String(j)}`)}
                    >
                      <PgnAccordionSummary aria-controls={`panel${j}b-content`} id={`panel${j}b-content`}>
                        <Typography className={classes.pgntext}>{pgn.name}</Typography>
                        <DeletePgnModal
                          id={id}
                          pgnId={pgn.pgn_id}
                          folderName={folder}
                          pgnName={pgn.name}
                        />
                      </PgnAccordionSummary>
                      <PgnAccordionDetails>
                        <Grid container className={classes.pgncontent}>
                          <Grid item xs={12} sm={12} md={12} lg={9} xl={6}>
                            <Card className={classes.iframecard} elevation={0}>
                              <iframe
                                src={pgn.iframe}
                                loading="lazy"
                                className={classes.iframe}
                                title={`lichess iframe game:${pgn.pgn_id}`}
                                frameBorder="0"
                              />
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={3} xl={6}>
                            <Card className={classes.pgninfocard} elevation={0}>
                              <Typography className={classes.text}>
                                <b>Event: </b>
                                {' '}
                                {pgn.rated === true ? 'Rated' : 'Unrated'}
                                {' '}
                                {pgn.speed}
                                {' '}
                                game
                              </Typography>
                              <Typography className={classes.text}>
                                <b>Variant: </b>
                                {' '}
                                {pgn.variant}
                              </Typography>
                              <Typography className={classes.text}>
                                <b>Winner: </b>
                                {' '}
                                {pgn.winner}
                              </Typography>
                              {pgn.black !== 'None'
                                ? (
                                  <a href={`https://lichess.org/@/${pgn.black}`} className={classes.link}>
                                    <Typography className={classes.text}>
                                      <b>Black: </b>
                                      {' '}
                                      {pgn.black}
                                      {' '}
                                      {pgn.black_rating}
                                    </Typography>
                                  </a>
                                )
                                : (
                                  <Typography className={classes.text}>
                                    <b>Black(non-player entity) </b>
                                  </Typography>
                                )}
                              {pgn.white !== 'None'
                                ? (
                                  <a href={`https://lichess.org/@/${pgn.white}`} className={classes.link}>
                                    <Typography className={classes.text}>
                                      <b>White: </b>
                                      {' '}
                                      {pgn.white}
                                      {' '}
                                      {pgn.white_rating}
                                    </Typography>
                                  </a>
                                )
                                : (
                                  <Typography className={classes.text}>
                                    <b>White(non-player entity) </b>
                                  </Typography>
                                )}
                              <Typography className={classes.text}>
                                <b>Game status: </b>
                                {' '}
                                {pgn.status}
                              </Typography>
                              <Button
                                variant="outlined"
                                className={classes.button}
                                startIcon={<PostAddIcon />}
                                onClick={() => navigator.clipboard.writeText(pgn.pgn)}
                              >
                                Copy PGN
                              </Button>

                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card className={classes.pgncard} elevation={0}>
                              <Typography className={classes.text}>
                                <b>Moves: </b>
                                {' '}
                                {pgn.moves}
                              </Typography>
                            </Card>
                            <Card className={classes.pgncard} elevation={0}>
                              <Typography className={classes.text}>
                                <b>PGN: </b>
                                {' '}
                                {pgn.pgn}
                              </Typography>
                            </Card>
                          </Grid>
                        </Grid>
                      </PgnAccordionDetails>
                    </PgnAccordion>
                  </React.Fragment>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      )) : (
        <Typography className={classes.nogames}>
          <b>No games currently</b>
        </Typography>
      ) }
    </div>
  );
};
