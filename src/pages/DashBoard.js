import React from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import { firebaseClient } from '../../firebaseClient';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Grid, Box, Divider, List, ListItem, Hidden, IconButton, ListItemText, Drawer, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import fire from '../../fire-config';
import {
    NavBarLoggedIn,
    SideDrawer,
} from "../components"
import Link from "next/link"
import { useAuth } from '../../auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: 'url("/checkmate.jpeg")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",        
    display: 'flex',
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
    const { uid, email } = token;
    let user = fire.auth().currentUser;

    return {
      props: { "id": uid, "email": email, "user": user},
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
    <>
    <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <NavBarLoggedIn />
          </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Box>
                    <SideDrawer id={props.id} email={props.email}/>
                </Box>
            </Grid>
        </Grid>
    </Box>
  </>
  );
}

export default dashboard;
