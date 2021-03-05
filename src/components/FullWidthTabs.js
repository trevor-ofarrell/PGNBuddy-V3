import React, { useState } from 'react';

import Router, { useRouter } from 'next/router';
import Link from 'next/link';

import {
  Grid,
  TextField,
  Button,
  Card,
  makeStyles,
  useTheme,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  createMuiTheme,
} from '@material-ui/core';
import {
  ThemeProvider,
} from '@material-ui/core/styles';

import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgb(49, 46, 44)',
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-1.75em',
      marginRight: '-1.75em',
    },
  },
  appbar: {
    background: 'rgb(49, 46, 44)',
  },
  card: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'rgb(69, 66, 64)',
    width: '100%',
  },
  textfield: {
    width: '100%',
    color: '#fafafa',
    fontColor: '#fafafa',
  },
  button: {
    width: '100%',
    color: '#fafafa',
  },
  label: {
    color: 'rgb(119, 116, 114)',
    fontWeight: '300',
  },
  input: {
    color: '#fafafa',
    fontWeight: '300',
  },
  indicator: {
    backgroundColor: '#fafafa',
  },
}));

const textFieldTheme = createMuiTheme({
  palette: {
    primary: { main: '#fafafa' },
  },
});

export const FullWidthTabs = ({
  userId, lichessUsername, handleClose, handleRateLimitDialog,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [username, setUsername] = useState(lichessUsername);
  const [folder, setFolder] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleTabOneSubmit = async (event) => {
    event.preventDefault();
    const data = {
      lichessUsername: username,
      folder,
      startDate: start,
      endDate: end,
      userData: { id: userId },
    };
    await fetch('/api/exportall', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then((res) => { Router.push('/dashboard'); router.reload(); });
  };

  const [name, setName] = useState('');
  const [gameString, setGameString] = useState('');
  const [folder2, setFolder2] = useState('');

  const handleTabTwoSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      folder: folder2,
      gameString,
      userData: { id: userId },
    };
    await fetch('/api/lichessupload', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        if (res.status === 200) {
          Router.push('/dashboard'); router.reload();
        } else {
          handleClose();
          handleRateLimitDialog(res.status);
        }
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={2} className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab label="export PGNs by date" {...a11yProps(0)} />
          <Tab label="export PGN by ID or link" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <ThemeProvider theme={textFieldTheme}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <form>
              <Card elevation={0} className={classes.card}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      label="User Name"
                      type="username"
                      autoComplete="username"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setUsername(event.target.value); }}
                      defaultValue={lichessUsername}
                      value={username}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      label="folder - leave blank for default naming"
                      type="folder"
                      autoComplete="folder"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setFolder(event.target.value); }}
                      value={folder}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      label="Start Date"
                      type="date"
                      autoComplete="date"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setStart(event.target.value); }}
                      value={start}
                      InputLabelProps={{
                        className: classes.label,
                        shrink: true,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      label="End Date"
                      type="date"
                      autoComplete="date"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setEnd(event.target.value); }}
                      value={end}
                      InputLabelProps={{
                        className: classes.label,
                        shrink: true,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Link href="/">
                    <div>
                      <Button
                        className={classes.button}
                        onClick={handleTabOneSubmit}
                      >
                        Export PGNs
                      </Button>
                    </div>
                  </Link>
                </Grid>
              </Card>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <form>
              <Card elevation={0} className={classes.card}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id="filled-password-input"
                      label="name - leave blank for default naming"
                      type="name"
                      autoComplete="name"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setName(event.target.value); }}
                      value={name}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id="filled-password-input"
                      label="folder - leave blank for default naming"
                      type="folder"
                      autoComplete="folder"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setFolder2(event.target.value); }}
                      value={folder2}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      id="filled-password-input2"
                      label="Lichess game ID or link"
                      type="Lichess game ID or link"
                      autoComplete="Lichess game ID or link"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setGameString(event.target.value); }}
                      value={gameString}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Link href="/">
                    <div>
                      <Button
                        className={classes.button}
                        onClick={handleTabTwoSubmit}
                      >
                        Export PGN
                      </Button>
                    </div>
                  </Link>
                </Grid>
              </Card>
            </form>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </ThemeProvider>
    </div>
  );
};
