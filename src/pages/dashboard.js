import React from 'react';

import {
  Box,
  withStyles,
  CssBaseline,
  Drawer,
  Hidden,
  Button,
  Grid,
  Typography,
  Card,
  ButtonGroup,
} from '@material-ui/core';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PostAddIcon from '@material-ui/icons/PostAdd';

import nookies from 'nookies';
import redis from 'redis';
import bluebird from 'bluebird';
import uuid from 'react-uuid';
import Link from 'next/link';

import { firebaseAdmin } from '../../firebaseAdmin';
import fire from '../../fire-config';

import {
  NavBarLoggedIn,
  DeleteFolderModal,
  DeletePgnModal,
  PgnUploadTabs,
  LichessExportModal,
} from '../components';

// TODO add player/folder/pgn bookmarks

const drawerWidth = 240;

const Accordion = withStyles({
  root: {
    background: 'rgb(39, 36, 34)',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0em',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    background: 'rgb(59, 56, 54)',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        background: 'rgb(49, 46, 44)',
      },
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const PgnAccordionSummary = withStyles((theme) => ({
  root: {
    background: 'rgb(59, 56, 54)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        background: 'rgb(49, 46, 44)',
      },
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
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
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw',
    background: 'rgb(39, 36, 34)',
  },
  accordian: {
    scrollbarColor: 'rgba(12, 12, 12, 0.766) rgba(58, 58, 58, 0.31)',
    scrollbarWidth: 50,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '94vh',
    width: '100%',
  },
  dash: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
      maxHeight: '94vh',
      marginTop: '6vh',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    marginTop: '4.545em',
    width: drawerWidth,
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: '10',
    marginBottom: 'auto',
    [theme.breakpoints.down('md')]: {
      marginTop: '0vh',
      backgroundColor: 'rgba(12, 12, 12, 0.875)',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '4.545em',
    },
  },
  content: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  sidedrawer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '0.65vh',
    },
    [theme.breakpoints.up('xl')]: {
      paddingTop: '-3.5vh',
    },
  },
  sideDrawerButton: {
    width: '100%',
    height: 'auto',
    padding: '1.5em',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    color: 'white',
    marginBottom: '0.5em',
    background: 'rgb(59, 56, 54)',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
    [theme.breakpoints.down('md')]: {
      background: 'rgb(39, 36, 34)',
      marginBottom: '0.6em',
    },
  },
  menuicon: {
    paddingTop: '45vh',
    paddingBottom: '45vh',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-2.5vw',
      marginRight: '-3vw',
    },
  },
  pgns: {
    width: '100%',
  },
  text: {
    color: 'white',
    wordWrap: 'break-all',
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
    maxWidth: '75vw',
    wordWrap: 'break-all',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px',
      width: '93.25%',
    },
  },
  nogames: {
    color: 'white',
    fontSize: '2.8em',
    textAlign: 'center',
    paddingTop: '30vh',
    marginLeft: '-3vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em',
      textAlign: 'center',
    },
  },
  iframe: {
    width: '100%',
    height: '45vh',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      height: '50vh',
    },
    [theme.breakpoints.down('md')]: {
      height: '42vh',
    },
    [theme.breakpoints.down('xs')]: {
      height: '32.25vh',
    },
  },
  pgncontent: {
    marginBottom: '0em',
    marginTop: '1em',
    [theme.breakpoints.up('xl')]: {
      marginLeft: '1vw',
      marginRight: '1vw',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: '1.5vw',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '-1vw',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-1.5vw',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0.5em',
      marginBottom: '1em',
      marginLeft: '0.2vw',

    },
  },
  iframecard: {
    background: 'rgb(59, 56, 54)',
    padding: '2em',
    [theme.breakpoints.up('lg')]: {
      marginRight: '1em',
    },
    [theme.breakpoints.down('md')]: {
      padding: '1em',
      marginBottom: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0em',
      marginBottom: '0.5em',
    },
  },
  pgncard: {
    background: 'rgb(59, 56, 54)',
    padding: '2em',
    marginTop: '1em',
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0.5em',
      marginBottom: '0.5em',
    },
  },
  pgninfocard: {
    background: 'rgb(59, 56, 54)',
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
  copypgncard: {
    background: 'rgb(59, 56, 54)',
    padding: '1em',
    height: '100%',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'underline white',
  },
  button: {
    color: 'white',
    borderColor: 'white',
    marginTop: '1vh',
  },
  nonprimarybutton: {
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
  },
  buttongroup: {
    marginTop: '0.5em',
  },
  grow: {
    flexGrow: 1,
  },
}));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const user = fire.auth().currentUser;
    const { uid, email } = token;

    bluebird.promisifyAll(redis.RedisClient.prototype);
    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    let pgnList = [];
    let userFolders = [];
    let userPgns = [];
    const promises = [];

    const lichessUsername = await cache.hgetAsync('users', email);

    await cache.smembersAsync(`${uid}-folder-names`).then(async (folders) => {
      userFolders = folders;

      userFolders.forEach((folder) => {
        promises.push(
          cache.hgetallAsync(`${uid}-${folder}`).then(async (value) => {
            if (value) {
              pgnList = Object.values(value);
              pgnList = pgnList.map(JSON.parse);
              userPgns.push(...pgnList);
            } else {
              userPgns = [];
              userFolders = [];
            }
          }),
        );
      });

      await Promise.all(promises).then(() => {
        if (userFolders && userPgns) {
          cache.quit();
        } else {
          userPgns = [];
          userFolders = [];
          cache.quit();
        }

        cache.quit();
      });
    });

    return {
      props: {
        id: uid, email, user, pgns: userPgns, folders: userFolders, lichessUsername,
      },
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

const Dashboard = (props) => {
  const {
    id, pgns, folders, lichessUsername,
  } = props;

  const classes = useStyles();

  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expandedPgn, setExpandedPgn] = React.useState('');

  const [expandedFolder, setExpandedFolder] = React.useState('');

  const handleFolderChange = (panel) => (event, newExpanded) => {
    setExpandedFolder(newExpanded ? panel : false);
  };

  const handlePgnChange = (panel) => (event, newExpanded) => {
    setExpandedPgn(newExpanded ? panel : false);
  };

  const playerLink = `/player/${lichessUsername}`;
  const drawer = (
    <div className={classes.sidedrawer}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <PgnUploadTabs
            label="Upload Single File"
            userId={id}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <LichessExportModal
            label="Import PGNs from lichess.org"
            userId={id}
            lichessUsername={lichessUsername}
          />
        </Grid>
        {lichessUsername
           && (
           <Grid item xs={12} sm={12} lg={12}>
             <Link href={playerLink}>
               <Button className={classes.sideDrawerButton}>
                 View my lichess stats
               </Button>
             </Link>
           </Grid>
           )}
      </Grid>
    </div>
  );

  return (
    <div className={classes.root}>
      <NavBarLoggedIn
        handleDrawerToggle={handleDrawerToggle}
        lichessUsername={lichessUsername}
        userId={id}
      />
      <Box>
        <div className={classes.dash}>
          <CssBaseline />
          <nav className={classes.drawer} aria-label="sideDrawerButton menu">
            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
              <Button className={classes.menuicon} onClick={handleDrawerToggle} aria-label="open side menu">
                <MenuOpenIcon style={{ fill: '#ffffff' }} />
              </Button>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            {pgns && (
            <div className={classes.accordian}>
              {folders.length !== 0 ? folders.map((folder, i) => (
                <React.Fragment key={`folder-${uuid()}-${folder}`}>
                  <Accordion
                    TransitionProps={{ unmountOnExit: true }}
                    expanded={expandedFolder === `panel${String(i)}`}
                    onChange={handleFolderChange(`panel${String(i)}`)}
                  >
                    <AccordionSummary aria-controls={`panel${i}a-content`} id={`panel${i}a-content`}>
                      <FolderOpenIcon style={{ fill: '#ffffff', marginRight: '1.5vw', marginTop: '2px' }} />
                      <Typography className={classes.foldertext}>{folder}</Typography>
                      <div className={classes.grow} />
                      <DeleteFolderModal folderName={folder} id={id} />
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={classes.pgns}>
                        {pgns.filter((game) => game.folder === folder).map((pgn, j) => (
                          <React.Fragment key={`pgn-${uuid()}-${pgn.pgn_id}`}>
                            <Accordion
                              TransitionProps={{ unmountOnExit: true }}
                              expanded={expandedPgn === `panel${String(j)}`}
                              onChange={handlePgnChange(`panel${String(j)}`)}
                            >
                              <PgnAccordionSummary aria-controls={`panel${j}b-content`} id={`panel${j}b-content`}>
                                <Typography style={{ wordWrap: 'break-word' }} className={classes.pgntext}>{pgn.name}</Typography>
                                <div className={classes.grow} />
                                <DeletePgnModal
                                  id={id}
                                  pgnId={pgn.pgn_id}
                                  folderName={folder}
                                  pgnName={pgn.name}
                                />
                              </PgnAccordionSummary>
                              <PgnAccordionDetails>
                                <Grid container className={classes.pgncontent}>
                                  {pgn.iframe !== '' && (
                                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
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
                                  )}
                                  {pgn.variant && pgn.status
                                    ? (
                                      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
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
                                              <a href={`/player/${pgn.black}`} className={classes.link}>
                                                <Typography className={classes.text}>
                                                  <b>Black: </b>
                                                  {' '}
                                                  {pgn.black}
                                                  {' '}
                                                  {pgn.blackRating}
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
                                              <a href={`/player/${pgn.white}`} className={classes.link}>
                                                <Typography className={classes.text}>
                                                  <b>White: </b>
                                                  {' '}
                                                  {pgn.white}
                                                  {' '}
                                                  {pgn.whiteRating}
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
                                          <ButtonGroup className={classes.buttongroup}>
                                            <Button
                                              variant="outlined"
                                              className={classes.nonprimarybutton}
                                              startIcon={<PostAddIcon />}
                                              onClick={() => navigator.clipboard.writeText(pgn.pgn)}
                                            >
                                              copy PGN
                                            </Button>
                                            <Button
                                              variant="outlined"
                                              className={classes.nonprimarybutton}
                                              startIcon={<PostAddIcon />}
                                              onClick={
                                                () => navigator.clipboard.writeText(pgn.moves)
                                              }
                                            >
                                              copy moves
                                            </Button>
                                          </ButtonGroup>
                                        </Card>
                                      </Grid>
                                    )
                                    : (
                                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Card className={classes.copypgncard} elevation={0}>
                                          <Button
                                            variant="outlined"
                                            className={classes.nonprimarybutton}
                                            startIcon={<PostAddIcon />}
                                            onClick={() => navigator.clipboard.writeText(pgn.pgn)}
                                          >
                                            copy PGN
                                          </Button>
                                        </Card>
                                      </Grid>
                                    )}
                                  <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Card className={classes.pgncard} elevation={0}>
                                      <Typography className={classes.text}>
                                        <b>PGN: </b>
                                        {' '}
                                        {pgn.pgn}
                                      </Typography>
                                    </Card>
                                    {pgn.moves && (
                                    <Card className={classes.pgncard} elevation={0}>
                                      <Typography className={classes.text}>
                                        <b>Moves: </b>
                                        {' '}
                                        {pgn.moves}
                                      </Typography>
                                    </Card>
                                    )}
                                  </Grid>
                                </Grid>
                              </PgnAccordionDetails>
                            </Accordion>
                          </React.Fragment>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              )) : (
                <Typography className={classes.nogames}>
                  <b>No PGN&#39;s saved currently</b>
                </Typography>
              ) }
            </div>
            )}
          </main>
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
