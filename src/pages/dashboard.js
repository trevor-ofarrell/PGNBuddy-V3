import React, { useState } from 'react';

import {
  CssBaseline,
  Drawer,
  Hidden,
  Button,
  Grid,
  Typography,
  Card,
  ButtonGroup,
  InputAdornment,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import {
  useTheme,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SearchIcon from '@material-ui/icons/Search';

import redis from 'redis';
import nookies from 'nookies';
import bluebird from 'bluebird';
import uuid from 'react-uuid';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import { firebaseAdmin } from '../../firebaseAdmin';
import fire from '../../fire-config';

import {
  useStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  PgnAccordionDetails,
  PgnAccordionSummary,
} from '../styles/dashboardstyles';

import {
  NavBarLoggedIn,
  DeleteFolderModal,
  DeletePgnModal,
  UploadPgnModal,
  LichessExportModal,
  EditModal,
} from '../components';

import useWindowSize from '../hooks/useWindowSize';

const PgnViewWrapper = dynamic(
  () => import('../components/PgnViewWrapper'),
  { ssr: false },
);
const isBrowser = () => typeof window !== 'undefined';

const customBreakpoints = createTheme({
  palette: {
    primary: { main: '#fafafa' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1660,
      xl: 2150,
    },
  },
});

const inputTheme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: '#fafafa' },
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px rgb(39, 36, 34) inset',
          WebkitTextFillColor: '#fafafa',
        },
      },
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
  const classes = useStyles();
  const theme = useTheme();
  const {
    id, pgns, folders, lichessUsername,
  } = props;
  const size = useWindowSize();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expandedPgn, setExpandedPgn] = useState('');
  const [expandedFolder, setExpandedFolder] = useState('');

  const handleFolderChange = (panel) => (event, newExpanded) => {
    setExpandedFolder(newExpanded ? panel : false);
  };
  const handlePgnChange = (panel) => (event, newExpanded) => {
    setExpandedPgn(newExpanded ? panel : false);
  };

  const [state, setState] = useState(folders.reduce((obj, key) => ({ ...obj, [key]: '' }), {}));

  const [search, setSearch] = useState('');
  const [folderList, setFolderList] = useState(folders);

  const getOpenings = (folder) => {
    const openings = pgns.filter((game) => game.folder === folder).map((pgn) => pgn.opening)
      .filter((v, i, a) => a.indexOf(v) === i && v !== '' && v !== undefined);
    return openings;
  };

  const filterPgns = (game, folder) => {
    let flag;
    try {
      if ([game.opening, game.name].some((item) => item.includes(state[[folder]])) === true) {
        flag = true;
      }
    } catch {
      flag = false;
    }
    return flag;
  };

  const playerLink = `/player/${lichessUsername}`;
  const drawer = (
    <div className={classes.sidedrawer}>
      <Grid container>
        <MuiThemeProvider theme={inputTheme}>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              name="search"
              label="Search Folders"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value !== '') {
                  const foldersCopy = folders;
                  setFolderList(foldersCopy.filter(
                    (folder) => folder.toLowerCase().includes(e.target.value.toLowerCase()),
                  ));
                } else if (e.target.value === '') {
                  setFolderList(folders);
                }
              }}
              className={classes.textfield}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.label,
              }}
              size="small"
              variant="outlined"
            />
          </Grid>
        </MuiThemeProvider>
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

  const FolderItems = ({ pgn, folder, j }) => (
    <>
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        expanded={expandedPgn === `panel${String(j)}`}
        onChange={handlePgnChange(`panel${String(j)}`)}
      >
        <PgnAccordionSummary aria-controls={`panel${j}b-content`} id={`panel${j}b-content`}>
          <div className={classes.nowrappgn}>
            <Typography noWrap className={classes.pgntext}>
              {pgn.name}
            </Typography>
          </div>
          <div className={classes.grow} />
          <DeletePgnModal
            id={id}
            pgnId={pgn.pgn_id}
            folderName={folder}
            pgnName={pgn.name}
          />
          {pgn.editable === true && (
            <EditModal id={id} pgnId={pgn.pgn_id} entryName="PGN" folderName={folder} />
          )}
        </PgnAccordionSummary>
        <PgnAccordionDetails>
          <Grid container className={classes.pgncontent}>
            <>
              <Grid
                item
                xs={12}
                sm={7}
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
              <Grid item xs={12} sm={5} md={6} lg={8} xl={9}>
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
          </Grid>
        </PgnAccordionDetails>
      </Accordion>
    </>
  );

  return (
    <div className={classes.root}>
      <NavBarLoggedIn
        handleDrawerToggle={handleDrawerToggle}
        lichessUsername={lichessUsername}
        userId={id}
        folders={folders}
        search={search}
        setSearch={setSearch}
        folderList={folderList}
        setFolderList={setFolderList}
      />
      <MuiThemeProvider theme={customBreakpoints}>
        <div className={classes.dash}>
          <CssBaseline />
          <nav className={classes.drawer} aria-label="sideDrawerButton menu">
            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
              <Button className={classes.menuicon} onClick={handleDrawerToggle} aria-label="open left side menu">
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
                  keepMounted: true,
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
            <div className={classes.accordian}>
              {folders.length !== 0 ? folderList.map((folder, i) => (
                <React.Fragment key={`folder-${uuid()}-${folder}`}>
                  <Accordion
                    TransitionProps={{ unmountOnExit: true }}
                    expanded={expandedFolder === `panel${String(i)}`}
                    onChange={handleFolderChange(`panel${String(i)}`)}
                  >
                    <AccordionSummary aria-controls={`panel${i}a-content`} id={`panel${i}a-content`}>
                      <FolderOpenIcon style={{
                        fill: '#fff', marginRight: '1.5vw', marginTop: 'auto', marginBottom: 'auto',
                      }}
                      />
                      <div className={classes.nowrap}>
                        <Typography noWrap className={classes.foldertext}>{folder}</Typography>
                      </div>
                      <div className={classes.grow} />
                      {getOpenings(folder).length !== 0 && (
                        <MuiThemeProvider theme={inputTheme}>
                          <FormControl
                            size="small"
                            className={classes.formControl}
                            variant="outlined"
                          >
                            <InputLabel className={classes.input} id={`${folder}-label`}>opening</InputLabel>
                            <Select
                              label="opening"
                              labelId={`${folder}-select-label`}
                              id={`${folder}-select-label`}
                              value={state[[folder]]}
                              onClick={(event) => event.stopPropagation()}
                              onFocus={(event) => event.stopPropagation()}
                              onChange={(e) => {
                                setState((prevState) => ({
                                  ...prevState,
                                  [folder]: e.target.value,
                                }));
                              }}
                            >
                              {getOpenings(folder).map((item) => (
                                <MenuItem key={`${item}-menuitem`} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                              <MenuItem
                                value=""
                                onClick={(e) => {
                                  if (state[[folder]] !== '') {
                                    setState((prevState) => ({
                                      ...prevState,
                                      [folder]: e.target.value,
                                    }
                                    ));
                                  }
                                }}
                              >
                                Clear selection
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </MuiThemeProvider>
                      )}
                      <div className={classes.actionIcons}>
                        <DeleteFolderModal folderName={folder} id={id} />
                      </div>
                      <div className={classes.actionIcons}>
                        {pgns.filter((game) => game.folder === folder)
                          .every((obj) => obj.editable === true) === true && (
                          <EditModal folderName={folder} id={id} entryName="folder" />
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={classes.pgns}>
                        {state[[folder]] !== '' ? (
                          <>
                            {pgns.filter((game) => game.folder === folder
                              && filterPgns(game, folder)).map((pgn, j) => (
                                <FolderItems key={`pgn-${uuid()}-${pgn.pgn_id}`} pgn={pgn} folder={folder} j={j} />
                            ))}
                          </>
                        ) : (
                          <>
                            {pgns.filter((game) => game.folder === folder).map((pgn, j) => (
                              <FolderItems key={`pgn-${uuid()}-${pgn.pgn_id}`} pgn={pgn} folder={folder} j={j} />
                            ))}
                          </>
                        )}
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
          </div>
        </div>
      </MuiThemeProvider>
    </div>
  );
};

export default Dashboard;
