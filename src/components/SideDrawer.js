import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

import {Accordian} from './Accordian'

import Link from 'next/link'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '1vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      maxHeight: '92vh',
      marginTop: '8vh'
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: '8vh',
    background: '#121212',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidedrawer: {
  },
  options: {
      width: '95%',
      height: '10vh',
      margin: '.5em',
      color: 'white',
      borderColor: 'white'
  }
}));

export const SideDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  async function Del() {
    const res = await fetch("http://127.0.0.1:5001/nothingyet");
  }

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
            <Button onClick={Del} className={classes.options} variant="outlined">
                Clear DB
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
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
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Accordian/>
      </main>
    </div>
  );
}
