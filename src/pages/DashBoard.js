import React from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import {
  Grid,
  Box,
  Button,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import fire from '../../fire-config';
import {
    NavBarLoggedIn,
    SideDrawer,
} from "../components"
import Link from "next/link"
import redis from 'redis';
import bluebird, { props } from 'bluebird';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url("/darkbg.png")',
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

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    let user = fire.auth().currentUser;
    const { uid, email } = token;
    bluebird.promisifyAll(redis.RedisClient.prototype);
    const cache = redis.createClient();
    let data = {};
    let pgnList2 = []
    let pgnList = []
    console.log("at attempt")
    await cache.existsAsync(`${uid}-pgns`).then(async reply => {
      console.log(uid)
      if (reply !== 1) { // cache miss, need to fetch
        await fire.firestore().collection(`${uid}-pgns`)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach( doc => {
            pgnList.push({ ...doc.data() })
        })
        })
        .catch(err => {
          console.log(err.message)
        })
        if (pgnList.length > 0) {
          cache.set(`${uid}-pgns`, JSON.stringify(pgnList));
        } else {
          console.log("pgnlistttt null")
          return
        }
      } else { // cache hit, will get data from redis
        data = JSON.parse(await cache.getAsync(`${uid}-pgns`));
        pgnList = data
      }
    });
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

  const drawer = (
    <div className={classes.sidedrawer}>
    <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <Link href="/exportpgn">
            <Button className={classes.options} variant="outlined">
                Export PGN from Lichess
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
        <Link href="/exportall">
            <Button className={classes.options} variant="outlined">
                Export PGNs by date
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Button className={classes.options}  variant="outlined" >
              Primary
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Button className={classes.options}  variant="outlined" >
              Primary
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Button className={classes.options}  variant="outlined" >
              Primary
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Button className={classes.options}  variant="outlined" >
              Primary
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Button className={classes.options}  variant="outlined" >
              Primary
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Button className={classes.options}  variant="outlined" >
              Primary
          </Button>
        </Grid>
    </Grid>
  </div>
  );
  
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
