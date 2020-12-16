import React from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import {
  Box,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import fire from '../../fire-config';
import {
    NavBarLoggedIn,
    SideDrawer,
} from "../components"
import redis from 'redis';
import bluebird, { props } from 'bluebird';
import { doc } from 'prettier';

//TODO: move all data storage aside from auth to redis only

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw',
    background: '#121212',
    backgroundBlendMode: 'overlay, difference, difference, normal',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center", 
  },

  body: {
    zIndex: '0',
    alignItems: "center",
    justifyContent: "center",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      maxHeight: '80vh',
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidedrawer: {
    marginLeft: '1em',
  },
  options: {
      width: '95%',
      height: '9.7vh',
      color: 'white',
      borderColor: 'white',
      marginBottom: '1em',
      background: 'linear-gradient(180deg, rgba(166, 166, 166, 0.662) 0%, rgba(53, 53, 53, 0.714) 32%, rgba(0, 0, 0, 0.858) 100%)',
  }
}));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    let user = fire.auth().currentUser;
    const { uid, email } = token;

    bluebird.promisifyAll(redis.RedisClient.prototype);
    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    let pgnList = []
    let folderList = []
    let userData = {}
    let userPgns = []
    let userFolders = []

    console.log("at attempt")
    userPgns = await cache.hgetallAsync(`${uid}-pgns`)
    console.log("got the pgns")
    userFolders = await cache.smembersAsync(`${uid}-folders`)
    console.log("got the folders")

    if (userFolders && userPgns) {
      console.log("after attempt")

      userPgns = Object.values(userPgns)

      userPgns = userPgns.map(JSON.parse)

      userData = {pgns: userPgns, folders: userFolders}
    }
    if (userData) {
      console.log("cache hit")
      pgnList = userData.pgns
      folderList = userData.folders
      cache.quit()
    } else {
      console.log("cache missed :'(")
      cache.quit()
    }
    cache.quit()
    if (!pgnList) {
      pgnList = null
    }
    if (!folderList) {
      folderList = null
    }
    return {
      props: { "id": uid, "email": email, "user": user, 'pgns': pgnList, 'folders': folderList},
    }

  } catch (err) {
    console.log(err)
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
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={classes.root}>
    <NavBarLoggedIn />
      <Box className={classes.body}>
          <SideDrawer id={props.id} email={props.email} pgns={props.pgns} folders={props.folders}/>
      </Box>
  </div>
  );
}

export default dashboard;
