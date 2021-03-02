import React, { useState } from 'react';
// Material UI
import {
  makeStyles,
} from '@material-ui/core/styles';

import {
  MenuItem,
  Menu,
  Typography,
  IconButton,
  AppBar,
  Button,
  Toolbar,
  Hidden,
  Grid,
  Drawer,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import Link from 'next/link';

import Router, { useRouter } from 'next/router';

import { firebaseClient } from '../../firebaseClient';

import { NameFolderModal } from '.';

const axios = require('axios');

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: 'Aldrich, sans-serif',
    display: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleMobile: {
    fontFamily: 'Aldrich, sans-serif',
    display: 'block',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  sectionDesktop: {
    display: 'none',
    marginTop: 'auto',
    marginBottom: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  minbutton: {
    fontFamily: 'Aldrich, sans-serif',
    color: '#FFFFFF',
  },
  mobileMenu: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgb(39, 36, 34)',
    },
  },
  mobilemenutext: {
    padding: '.7em',
    color: 'white',
  },
  menuicon: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-2.5vw',
      marginRight: '-2.5vw',
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
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '5vh',
    },
  },
  sidedrawer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '94%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '0.5em',
    },
    [theme.breakpoints.up('xl')]: {
      paddingTop: '-3.5vh',
    },
  },
  sideDrawerButton: {
    width: '94%',
    height: 'auto',
    padding: '1.5em',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    color: 'white',
    marginBottom: '1em',
    background: 'rgb(59, 56, 54)',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
    [theme.breakpoints.down('sm')]: {
      background: 'rgb(39, 36, 34)',
      marginBottom: '0.6em',
      width: '100%',
    },
  },
  kingsvg: {
    marginTop: '-0.65vh',
  },
}));

export const NavBarLoggedIn = ({ lichessUsername, userId }) => {
  const classes = useStyles();
  const router = useRouter();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const theme = useTheme();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.mobileMenu}
    >
      <Link href="/">
        <MenuItem>
          <Typography variant="h6" className={classes.mobilemenutext}>
            Home
          </Typography>
        </MenuItem>
      </Link>
      <Link href="/dashboard">
        <MenuItem>
          <Typography variant="h6" className={classes.mobilemenutext}>
            Dashboard
          </Typography>
        </MenuItem>
      </Link>
      <MenuItem
        onClick={async () => {
          await firebaseClient.auth().signOut();
          Router.push('/');
          router.reload();
        }}
      >
        <Typography variant="h6" className={classes.mobilemenutext}>
          Log Out
        </Typography>
      </MenuItem>
    </Menu>
  );

  const playerLink = `/player/${lichessUsername}`;
  const drawer = (
    <div className={classes.sidedrawer}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <NameFolderModal
            label="Upload Single File"
            userId={userId}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Link href="/exportpgn">
            <Button className={classes.sideDrawerButton}>
              Export PGN from Lichess
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Link href="/exportall">
            <Button className={classes.sideDrawerButton}>
              Export PGNs from lichess by date (100 game limit per request)
            </Button>
          </Link>
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
    <div className={classes.grow}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
      >
        <Toolbar>
          <Hidden smUp>
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
            <div className={classes.grow} />
            <img src="/king.svg" className={classes.kingsvg} height={45} width={40} alt="silloette of king chess piece" />
            <Link href="/">
              <Typography className={classes.titleMobile} variant="h6" noWrap>
                PGNBuddy
              </Typography>
            </Link>
            <div className={classes.grow} />
          </Hidden>
          <Hidden xsDown>
            <img src="/king.svg" className={classes.kingsvg} height={45} width={40} alt="silloette of king chess piece" />
            <Link href="/">
              <Typography className={classes.title} variant="h4" noWrap>
                PGNBuddy
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link href="/">
                <Button color="inherit" className={classes.minbutton}>
                  home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button color="inherit" className={classes.minbutton}>
                  dashboard
                </Button>
              </Link>
              <Button
                color="inherit"
                className={classes.minbutton}
                onClick={async () => {
                  await firebaseClient.auth().signOut();
                  window.location.href = '/';
                }}
              >
                Log Out
              </Button>
            </div>
          </Hidden>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon style={{ fill: '#ffffff' }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};
