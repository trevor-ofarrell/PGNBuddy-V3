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

    await cache.smembersAsync(`${uid}-folder-names`).then(async function(folders) {
      userFolders = folders
      for (let i = 0; i < folders.length; i++) {
        await cache.hgetallAsync(`${uid}-${folders[i]}`).then(async function(value) {
          if (value) {
            pgnList = Object.values(value)
            pgnList = pgnList.map(JSON.parse)
            userPgns.push(...pgnList)
            console.log(pgnList.length)
          } else {
            userPgns = []
            userFolders = []
          }
        })
      }
     
  
    })
    await sleep(750).then(() => {
      if (userFolders && userPgns) {
        console.log("cache hit", userFolders, userPgns.length)
        cache.quit()
      }
      else {
        userPgns = []
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
