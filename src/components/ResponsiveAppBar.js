import React from "react";
import Link from "next/link";

// Material UI
import {
  makeStyles,
} from "@material-ui/core/styles";

import {
  MenuItem,
  Menu,
  Typography,
  IconButton,
  AppBar,
  Button,
  Toolbar,
} from "@material-ui/core";

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
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
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
    width: '100%',
    height: '100%',
    padding: '1em',
  },
  menubutton: {
    width: '100%',
    height: '100%',
    padding: '1em',
  },
  appbar: {
    height: '5vh',
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
          <Button color="inherit" className={classes.menubutton}>
            Home
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href='/dashboard'>
          <Button color="inherit" className={classes.menubutton}>
            Dashboard
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Button
            className={classes.menubutton}
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
