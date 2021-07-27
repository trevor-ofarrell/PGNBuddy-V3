import React, { useState } from 'react';
// Material UI
import {
  makeStyles,
  useTheme,
  createTheme,
  MuiThemeProvider,
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
  InputAdornment,
  TextField,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import Link from 'next/link';

import Router, { useRouter } from 'next/router';

import { firebaseClient } from '../../firebaseClient';

import { UploadPgnModal, LichessExportModal } from '.';

const drawerWidth = 240;

const inputTheme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: '#fafafa' },
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px rgb(39, 36, 34) inset',
          WebkitTextFillColor: '#fafafa',
        },
      },
    },
  },
});

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
    marginTop: '0.2em',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    cursor: 'pointer',
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
    cursor: 'pointer',
    PointerEvents: 'none',
    marginTop: '-0.4em',
  },
  flex: {
    display: 'flex',
  },
  textfield: {
    marginTop: '0.5em',
    marginBottom: '0.6em',
    width: '100%',
    color: '#fafafa',
    borderColor: '#fafafa',
    fontColor: '#fafafa',
  },
  label: {
    color: '#fafafa',
    fontWeight: '300',
    borderColor: '#fafafa',
  },
  input: {
    color: '#fafafa',
    fontWeight: '300',
    borderColor: '#fafafa',
  },
}));

export const NavBarLoggedIn = ({
  lichessUsername, userId, folders, search, setSearch, folderList, setFolderList,
}) => {
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
      <Link href="/dashboard">
        <MenuItem>
          <Typography variant="h6" className={classes.mobilemenutext}>
            Dashboard
          </Typography>
        </MenuItem>
      </Link>
      <Link href="/about">
        <MenuItem>
          <Typography variant="h6" className={classes.mobilemenutext}>
            About
          </Typography>
        </MenuItem>
      </Link>
      <MenuItem
        onClick={async () => {
          await firebaseClient.auth().signOut().then(() => {
            router.push('/');
          });
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
          <MuiThemeProvider theme={inputTheme}>
            <TextField
              name="search"
              label="Search Folders"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onFocus={(event) => event.stopPropagation()}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value !== '') {
                  const foldersCopy = folders;
                  setFolderList(foldersCopy.filter((folder) => folder.startsWith(e.target.value)));
                  console.log(e.target.value, folderList);
                } else if (e.target.value === '') {
                  setFolderList(folders);
                }
              }}
              className={classes.textfield}
              InputLabelProps={{
                className: classes.label,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                className: classes.input,
              }}
              size="small"
              variant="outlined"
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <UploadPgnModal
            label="Upload Single File"
            userId={userId}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <LichessExportModal
            label="Import PGNs from lichess.org"
            userId={userId}
            lichessUsername={lichessUsername}
          />
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
          <Hidden mdUp>
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
              <div className={classes.flex}>
                <img src="/king.svg" className={classes.kingsvg} height={45} width={40} alt="silloette of king chess piece" />
                <Typography className={classes.titleMobile} variant="h5" noWrap>
                  PGNBuddy
                </Typography>
              </div>
            </Link>
            <div className={classes.grow} />
          </Hidden>
          <Hidden smDown>
            <Link href="/">
              <div className={classes.flex}>
                <img src="/king.svg" className={classes.kingsvg} height={45} width={40} alt="silloette of king chess piece" />
                <Typography className={classes.title} variant="h4" noWrap>
                  PGNBuddy
                </Typography>
              </div>
            </Link>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link href="/dashboard">
                <Button color="inherit" className={classes.minbutton}>
                  dashboard
                </Button>
              </Link>
              <Link href="/about">
                <Button color="inherit" className={classes.minbutton}>
                  about
                </Button>
              </Link>
              <Button
                color="inherit"
                className={classes.minbutton}
                onClick={async () => {
                  await firebaseClient.auth().signOut().then(() => {
                    router.push('/');
                  });
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
