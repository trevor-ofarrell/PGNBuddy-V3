import React from "react";
import Link from "next/link";

// Material UI
import {
  fade,
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import {
  MenuItem,
  Menu,
  Badge,
  Typography,
  IconButton,
  AppBar,
  Button,
  Toolbar,
} from "@material-ui/core";

// Material icons
import MenuIcon from '@material-ui/icons/Menu';

import { firebaseClient } from '../../firebaseClient';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  minbutton: {
    color: "#FFFFFF",
  },
  appbar: {
    height: '5vh',
  },
  borderbutton: {
    borderWidth: 2,
    borderColor: "white",
    color: 'white',
    borderRadius: 5,
    borderStyle: "solid",
    marginRight: "8px",
    width: "100px",
  },
  orangebutton: {
    backgroundColor: "orange",
    width: "100px",
  },
}));

export const ResponsiveAppBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>

      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link href='/'>
          <Button color="inherit">
            Home
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href='/dashboard'>
          <Button color="inherit">
            Dashboard
          </Button>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button
            color="inherit"
            onClick={async () => {
                window.location.href = '/login';
            }}
        >
            Log In
        </Button>
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
        style={{
          backgroundColor:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
        }}
      >
        <Toolbar>
          <Link href='/dashboard'>
            <Typography
              className={classes.title}
              variant="h4"
              noWrap
              style={{ color: "white", fontWeight: "bold" }}
            >
              PGNBuddy
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Link href='/'>
              <Button color="inherit" className={classes.minbutton}>
                home
              </Button>
            </Link>
            <Link href='/dashboard'>
              <Button color="inherit" className={classes.minbutton}>
                dashboard
              </Button>
            </Link>
            <Button
              color="inherit"
              className={classes.minbutton}
              onClick={async () => {
                window.location.href = '/login';
              }}
            >
                  Log In
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon style={{fill: '#ffffff'}} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
