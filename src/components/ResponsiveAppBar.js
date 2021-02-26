import React from 'react';
import Link from 'next/link';

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
} from '@material-ui/core';

// Material icons
import MenuIcon from '@material-ui/icons/Menu';

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
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title2: {
    fontFamily: 'Aldrich, sans-serif',
    display: 'block',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
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
    width: '100%',
    height: '100%',
    padding: '1em',
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
  appbar: {
    height: '4.75vh',
    [theme.breakpoints.down('xs')]: {
      height: '6vh',
    },
  },
  kingsvg: {
    marginTop: '-0.65vh',
  },
}));

export const ResponsiveAppBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem />
    </Menu>
  );

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
          window.location.href = '/login';
        }}
      >
        <Typography variant="h6" className={classes.mobilemenutext}>
          Login
        </Typography>
      </MenuItem>
    </Menu>
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
            <img src="/king.svg" className={classes.kingsvg} height={45} width={40} alt="silloette of king chess piece" />
            <Link href="/">
              <Typography className={classes.title2} variant="h6" noWrap>
                PGNBuddy
              </Typography>
            </Link>
            <div className={classes.grow} />
          </Hidden>
          <Hidden xsDown>
            <img src="/king.svg" className={classes.kingsvg} height={45} width={40} alt="silloette of king chess piece" />
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
              <Link href="/login">
                <Button color="inherit" className={classes.minbutton}>
                  log in
                </Button>
              </Link>
            </div>
          </Hidden>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon style={{ fill: '#ffffff' }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
