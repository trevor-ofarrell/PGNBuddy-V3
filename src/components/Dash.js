import React, { useEffect } from 'react';
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
import { useRouter } from 'next/router'

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
      maxHeight: '94vh',
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
    marginTop: '6.5vh',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      marginTop: '0vh',
      backgroundColor: 'rgba(12, 12, 12, 0.875)',
      paddingRight: '1.75vw',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '5vh',
    },
  },
  content: {
    flexGrow: 1,
    marginTop: '1.5vh',
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('xl')]: {
      marginTop: '0vh',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  sidedrawer: {
    marginLeft: '1em',
    [theme.breakpoints.down('md')]: {
      paddingTop: '7vh',
    },
    [theme.breakpoints.up('xl')]: {
      paddingTop: '-3.5vh',
    },
  },
  options: {
    width: '95%',
    height: '10.14vh',
    color: 'white',
    marginBottom: '1em',
    background: 'rgba(58,58,58, .5)',
    [theme.breakpoints.down('sm')]: {
      background: 'rgba(12,12,12, .7)',
      marginBottom: '0.6em',
      width: '100%',
    }
  },
  optionsred: {
    width: '95%',
    height: '10.14vh',
    color: 'white',
    marginBottom: '1em',
    background: 'rgba(58,58,58, .5)',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0.6em',
      width: '100%',
    }
},
  menuicon: {
    paddingTop: "45vh",
    paddingBottom: '45vh',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-2.5vw',
      marginRight: '-3vw'
    },
  }
}));

export const Dash = (props, windows) => {
  const { window } = windows;
  const {id, email, pgns, folders} = props
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const clearDb = async (event) => {
    event.preventDefault();
    const data = {
      'collectionPath': `${props.id}`,
    }
    await fetch('/api/deletepgns', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
    router.reload()
  }

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
                  Export PGNs by date (100 game limit per request)
              </Button>
            </Link>
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
          <Button className={classes.menuicon} onClick={handleDrawerToggle} aria-label="open side menu">
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
        <Accordian id={id} email={email} pgns={pgns} folders={folders}/>
      </main>
    </div>
  );
}
