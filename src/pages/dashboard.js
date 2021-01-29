import React from 'react';
import nookies from 'nookies';
import {
  Box,

  CssBaseline,
  Drawer,
  Hidden,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import redis from 'redis';
import bluebird from 'bluebird';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import Link from 'next/link';
import fire from '../../fire-config';
import {
  NavBarLoggedIn,
  Accordian,
} from '../components';
import { firebaseAdmin } from '../../firebaseAdmin';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw',
    background: 'rgb(29, 26, 24)',
  },
  body: {
    zIndex: '0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dash: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
      maxHeight: '94vh',
      marginTop: '8vh',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '6.5vh',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      marginTop: '0vh',
      backgroundColor: 'rgba(12, 12, 12, 0.875)',
      paddingRight: '1.75vw',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '5vh',
    },
  },
  content: {
    flexGrow: 1,
    marginTop: '1.5vh',
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('xl')]: {
      marginTop: '0vh',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  sidedrawer: {
    marginLeft: '1em',
    [theme.breakpoints.down('md')]: {
      paddingTop: '7vh',
    },
    [theme.breakpoints.up('xl')]: {
      paddingTop: '-3.5vh',
    },
  },
  options: {
    width: '95%',
    height: '10.14vh',
    color: 'white',
    marginBottom: '1em',
    background: 'rgb(59, 56, 54)',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
    [theme.breakpoints.down('sm')]: {
      background: 'rgba(12,12,12, .7)',
      marginBottom: '0.6em',
      width: '100%',
    },
  },
  optionsred: {
    width: '95%',
    height: '10.14vh',
    color: 'white',
    marginBottom: '1em',
    background: 'rgba(58,58,58, .5)',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0.6em',
      width: '100%',
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
}));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

    await cache.smembersAsync(`${uid}-folder-names`).then(async (folders) => {
      userFolders = folders;
      for (let i = 0; i < folders.length; i++) {
        await cache.hgetallAsync(`${uid}-${folders[i]}`).then(async (value) => {
          if (value) {
            pgnList = Object.values(value);
            pgnList = pgnList.map(JSON.parse);
            userPgns.push(...pgnList);
            console.log(pgnList.length);
          } else {
            userPgns = [];
            userFolders = [];
          }
        });
      }
    });
    await sleep(10).then(() => {
      if (userFolders && userPgns) {
        console.log('cache hit', userFolders, userPgns.length);
        cache.quit();
      } else {
        userPgns = [];
        userFolders = [];
        console.log("cache missed :'(");
        cache.quit();
      }

      cache.quit();
    });

    return {
      props: {
        id: uid, email, user, pgns: userPgns, folders: userFolders,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
};

const dashboard = (props) => {
  const {
    id, email, pgns, folders,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.sidedrawer}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <Link href="/exportpgn">
            <Button className={classes.options}>
              Export PGN from Lichess
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Link href="/exportall">
            <Button className={classes.options}>
              Export PGNs by date (100 game limit per request)
            </Button>
          </Link>
        </Grid>

      </Grid>
    </div>
  );

  return (
    <div className={classes.root}>
      <NavBarLoggedIn handleDrawerToggle={handleDrawerToggle} />
      <Box className={classes.body}>
        <div className={classes.dash}>
          <CssBaseline />
          <nav className={classes.drawer} aria-label="options menu">
            <Hidden only={['xs', 'lg', 'xl']}>
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
            <Accordian id={id} email={email} pgns={pgns} folders={folders} />
          </main>
        </div>
      </Box>
    </div>
  );
};

export default dashboard;
