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
import { firebaseClient } from '../../firebaseClient';

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
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title2: {
    display: 'block',
    textAlign: 'center',
  },
  sectionDesktop: {
    display: 'none',
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
  appbar: {
    height: '4.75vh',
    [theme.breakpoints.down('xs')]: {
      height: '6.5vh',
    },
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
    paddingTop: '45vh',
    paddingBottom: '45vh',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-2.5vw',
      marginRight: '-3vw',
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
    padding: '2em',
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
}));

export const NavBarLoggedIn = ({ lichessUsername }) => {
  const classes = useStyles();
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
          window.location.href = '/';
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
          <Link href="/exportpgn">
            <Button className={classes.sideDrawerButton}>
              Export PGN from Lichess
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Link href="/exportall">
            <Button className={classes.sideDrawerButton}>
              Export PGNs by date (100 game limit per request)
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
        className={classes.appbar}
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
            <Link href="/">
              <Typography
                className={classes.title2}
                variant="h6"
                noWrap
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                PGNBuddy
              </Typography>
            </Link>
          </Hidden>
          <Link href="/">
            <Typography
              className={classes.title}
              variant="h4"
              noWrap
              style={{ color: 'white', fontWeight: 'bold' }}
            >
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
