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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(126.95deg, #000000 0%, #F9FFB1 100%), radial-gradient(91.23% 100% at 50% 100%, #BE002E 0%, #6100FF 100%), linear-gradient(307.27deg, #1DAC92 0.37%, #2800C6 100%), radial-gradient(100% 140% at 100% 0%, #EAFF6B 0%, #006C7A 57.29%, #2200AA 100%)',
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

    let data = {};
    let pgnList = []
    console.log("at attempt")
    await cache.existsAsync(`${uid}-pgns`).then(async reply => {
      console.log(uid)
      if (reply !== 1) { // cache miss, need to fetch
        let index = 0
        console.log("cache missed :'(")
      } else { // cache hit, will get data from redis
          const docRef = fire.firestore().collection(`${uid}-pgns`)
          const snapshot = await docRef.where('user_id', '==', uid).limit(1).get()
          if (snapshot.empty) {
            cache.del(`${uid}-pgns`)
            cache.quit()
            console.log("bye bye")
          }else {
            data = JSON.parse(await cache.getAsync(`${uid}-pgns`));
            console.log("cache hit")
            cache.quit()
            pgnList = data
          }  
      }
    });
    cache.quit()
    return {
      props: { "id": uid, "email": email, "user": user, 'pgns': pgnList},
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

const dashboard = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={classes.root}>
    <NavBarLoggedIn />
      <Box className={classes.body}>
          <SideDrawer id={props.id} email={props.email} pgns={props.pgns}/>
      </Box>
  </div>
  );
}

export default dashboard;
