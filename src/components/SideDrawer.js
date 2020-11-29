import React from 'react';
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
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {Accordian} from './Accordian'

import Link from 'next/link'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
      maxHeight: '92vh',
      marginTop: '8vh'
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '8vh',
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
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
  },
  menuicon: {
    width: '4vw',
    marginTop: "47vh",
  }
}));

export const SideDrawer = (props, windows) => {
  const { window } = windows;
  const {id, email, user} = props
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Hidden mdUp implementation="css">
        <Button className={classes.menuicon} onClick={handleDrawerToggle}>
            <MenuOpenIcon style={{fill: '#ffffff'}}/>
        </Button>
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
        <Hidden smDown implementation="css">
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
        <Accordian id={id} email={email} user={user}/>
      </main>
    </div>
  );
}
