import React from 'react';
import {
  CssBaseline,
  Drawer,
  Hidden,
  makeStyles,
  useTheme,
  Button,
  Grid,
} from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {Accordian} from './Accordian'

import Link from 'next/link'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
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
    border: 'none',
    boxShadow: 'none'
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3.2),
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
      height: '10.14vh',
      color: 'white',
      marginBottom: '1em',
      background: 'linear-gradient(to right, #303030, #121212)',
      [theme.breakpoints.down('sm')]: {
        background: 'linear-gradient(to right, #303030, #121212)',
        marginBottom: '0.6em',
        width: '100%',
      }
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
              <Button className={classes.options} >
                  Export PGN from Lichess
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
          <Link href="/exportall">
              <Button className={classes.options}>
                  Export PGNs by date
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Button className={classes.options}>
                Primary
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Button className={classes.options}>
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
      <nav className={classes.drawer} aria-label="options menu">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden lgUp implementation="css">
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
        <Hidden mdDown implementation="css">
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
