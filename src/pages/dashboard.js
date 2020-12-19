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

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw',
    background: '-webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    backgroundSize: "cover",
    backgroundPosition: "center", 
  },
  body: {
    zIndex: '0',
    alignItems: "center",
    justifyContent: "center",
  },
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
    let userFolders = []
    let userPgns = []

    userFolders = await cache.smembersAsync(`${uid}-folder-names`)
    await userFolders.forEach(async (folder) => {
      await cache.hgetallAsync(`${uid}-${folder}`).then(async (pgns) => {
        pgnList = Object.values(pgns)
        pgnList = pgnList.map(JSON.parse)
        userPgns.push(...pgnList)
        console.log(pgnList.length)
        await sleep(10)
      })
      cache.quit()
    }) 
    await sleep(750).then(() => {
      if (userFolders && pgnList) {
        console.log("cache hit", userFolders, pgnList.length)
        cache.quit()
      }
      else {
        pgnList = []
        userFolders = []
        console.log("cache missed :'(")
        cache.quit()
      }
  
      cache.quit()
    })

    return {
      props: { "id": uid, "email": email, "user": user, 'pgns': userPgns, 'folders': userFolders},
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
