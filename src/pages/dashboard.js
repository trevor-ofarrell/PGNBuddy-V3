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
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PostAddIcon from '@material-ui/icons/PostAdd';

import nookies from 'nookies';
import redis from 'redis';
import bluebird from 'bluebird';
import uuid from 'react-uuid';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import { firebaseAdmin } from '../../firebaseAdmin';
import fire from '../../fire-config';

import { useStyles } from '../styles/dashboardstyles';
import {
  NavBarLoggedIn,
  DeleteFolderModal,
  DeletePgnModal,
  UploadPgnModal,
  LichessExportModal,
  EditModal,
} from '../components';

const PgnViewWrapper = dynamic(
  () => import('../components/PgnViewWrapper'),
  { ssr: false },
);
const isBrowser = () => typeof window !== 'undefined';

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

const customBreakpoints = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 960,
      lg: 1660,
      xl: 2150,
    },
  },
});

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
          <UploadPgnModal
            label="Import PGNs from lichess.org"
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
          <div className={classes.content}>
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
                      <EditModal folderName={folder} id={id} entryName="folder" pgnName="" />
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
                                <EditModal pgnName={pgn.name} id={id} pgnId={pgn.pgn_id} entryName="PGN" folderName={folder} />
                              </PgnAccordionSummary>
                              <PgnAccordionDetails>
                                <Grid container className={classes.pgncontent}>
                                  <MuiThemeProvider theme={customBreakpoints}>
                                    <>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={4}
                                        xl={3}
                                        className={classes.pgnview}
                                      >
                                        {isBrowser && (
                                        <Card className={classes.pgnviewercard} elevation={0}>
                                          <PgnViewWrapper pgn={pgn.pgn} />
                                        </Card>
                                        )}
                                      </Grid>
                                      <Grid item xs={12} sm={6} md={6} lg={8} xl={9}>
                                        <Card className={classes.pgncopycard} elevation={0}>
                                          <div className={classes.pgninfotext}>
                                            {pgn.rated && pgn.speed && (
                                            <Typography className={classes.text}>
                                              <b>Event: </b>
                                              {' '}
                                              {pgn.rated === true ? 'Rated' : 'Unrated'}
                                              {' '}
                                              {pgn.speed}
                                              {' '}
                                              game
                                            </Typography>
                                            )}
                                            {pgn.variant && (
                                            <Typography className={classes.text}>
                                              <b>Variant: </b>
                                              {' '}
                                              {pgn.variant}
                                            </Typography>
                                            )}
                                            {pgn.opening && (
                                            <Typography className={classes.text}>
                                              <b>Opening: </b>
                                              {' '}
                                              {pgn.opening}
                                            </Typography>
                                            )}
                                            {pgn.winner && (
                                            <Typography className={classes.text}>
                                              <b>Winner: </b>
                                              {' '}
                                              {pgn.winner}
                                            </Typography>
                                            )}
                                            {pgn.status && (
                                            <Typography className={classes.text}>
                                              <b>Game status: </b>
                                              {' '}
                                              {pgn.status}
                                            </Typography>
                                            )}
                                            {pgn.black && pgn.blackRating && (
                                              <>
                                                {pgn.lichess === true ? (
                                                  <a href={`/player/${pgn.black}`} className={classes.link}>
                                                    <Typography className={classes.text}>
                                                      <b>Black: </b>
                                                      {' '}
                                                      {pgn.black}
                                                      {' '}
                                                      {pgn.blackRating}
                                                    </Typography>
                                                  </a>
                                                ) : (
                                                  <Typography className={classes.text}>
                                                    <b>Black: </b>
                                                    {' '}
                                                    {pgn.black}
                                                    {' '}
                                                    {pgn.blackRating}
                                                  </Typography>
                                                )}
                                              </>
                                            )}
                                            {pgn.white && pgn.whiteRating && (
                                              <>
                                                {pgn.lichess === true ? (
                                                  <a href={`/player/${pgn.white}`} className={classes.link}>
                                                    <Typography className={classes.text}>
                                                      <b>White: </b>
                                                      {' '}
                                                      {pgn.white}
                                                      {' '}
                                                      {pgn.whiteRating}
                                                    </Typography>
                                                  </a>
                                                ) : (
                                                  <Typography className={classes.text}>
                                                    <b>White: </b>
                                                    {' '}
                                                    {pgn.white}
                                                    {' '}
                                                    {pgn.whiteRating}
                                                  </Typography>
                                                )}
                                              </>
                                            )}
                                          </div>
                                          {pgn.moves && (
                                          <ButtonGroup className={classes.buttongroup}>
                                            <Button
                                              variant="outlined"
                                              className={classes.nonprimarybutton}
                                              startIcon={<PostAddIcon />}
                                              onClick={
                                                () => navigator.clipboard.writeText(pgn.pgn)
                                              }
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
                                          )}
                                          {!pgn.moves && (
                                          <Button
                                            variant="outlined"
                                            className={classes.nonprimarybutton}
                                            startIcon={<PostAddIcon />}
                                            onClick={
                                              () => navigator.clipboard.writeText(pgn.pgn)
                                            }
                                          >
                                            copy PGN
                                          </Button>
                                          )}
                                        </Card>
                                        <Card className={classes.pgncard2} elevation={0}>
                                          <Typography className={classes.text}>
                                            <b>PGN: </b>
                                            {' '}
                                            {pgn.pgn}
                                          </Typography>
                                        </Card>
                                        {pgn.moves && (
                                        <Card className={classes.pgncard2} elevation={0}>
                                          <Typography className={classes.text}>
                                            <b>Moves: </b>
                                            {' '}
                                            {pgn.moves}
                                          </Typography>
                                        </Card>
                                        )}
                                      </Grid>
                                    </>
                                  </MuiThemeProvider>
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
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
