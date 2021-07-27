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
  Box,
  createTheme,
  Typography,
} from '@material-ui/core';
import {
  ThemeProvider,
} from '@material-ui/core/styles';

import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';

import { FileUploadButton } from '.';

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
  text: {
    color: '#fafafa',
    paddingBottom: '1em',
  },
  title: {
    paddingBottom: '0.75em',
  },
}));

const textFieldTheme = createTheme({
  palette: {
    primary: { main: '#fafafa' },
  },
});

export const PgnUploadTabs = ({
  userId, handleClose, handleMaxRequestErrorOpen,
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

  const [folderName, setFolderName] = useState('');
  const [pgnName, setPgnName] = useState('');
  const [pgn, setPgn] = useState('');

  const submitClipboardUpload = async (event) => {
    event.preventDefault();
    const data = {
      pgnName,
      folderName,
      pgn,
      userData: { id: userId },
    };
    await fetch('/api/uploadpgn', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        Router.push('/dashboard');
        router.reload();
      });
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={textFieldTheme}>

        <AppBar position="static" elevation={2} className={classes.appbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="choose PGN upload option"
            classes={{
              indicator: classes.indicator,
            }}
          >
            <Tab className={classes.textfield} label="Upload PGN's from filesystem" {...a11yProps(0)} />
            <Tab className={classes.textfield} label="Paste PGN from clipboard" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <form>
              <div className={classes.text}>
                <Typography variant="h6" className={classes.title}>
                  Enter name for new, or existing folder.
                </Typography>
              </div>
              <Card elevation={0} className={classes.card}>
                <Card elevation={0} className={classes.card}>
                  <TextField
                    id="outlined-basic"
                    label="folder"
                    variant="filled"
                    className={classes.textfield}
                    InputLabelProps={{
                      className: classes.label,
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                  />
                  <Grid container>
                    <Grid item xs={3} xl={3} />
                    <Grid item xs={12} xl={12}>
                      <FileUploadButton
                        label="select PGN files"
                        userId={userId}
                        uploadFolderName={folderName}
                        handleMaxRequestErrorOpen={handleMaxRequestErrorOpen}
                        handleClose={handleClose}
                      />
                    </Grid>
                    <Grid item xs={3} xl={3} />
                  </Grid>
                </Card>
              </Card>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <form>
              <div className={classes.text}>
                <Typography variant="h6" className={classes.title}>
                  Enter name for new, or existing folder,
                  and the PGN file, then paste PGN file contents below.
                </Typography>
              </div>
              <Card elevation={0} className={classes.card}>
                <ThemeProvider theme={textFieldTheme}>
                  <Card elevation={0} className={classes.card}>
                    <TextField
                      id="outlined-basic"
                      label="folder"
                      variant="filled"
                      className={classes.textfield}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="PGN name"
                      variant="filled"
                      className={classes.textfield}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                      value={pgnName}
                      onChange={(e) => setPgnName(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="paste PGN"
                      variant="filled"
                      multiline
                      rows={8}
                      className={classes.textfield}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                      value={pgn}
                      onChange={(e) => setPgn(e.target.value)}
                    />
                    <Grid container>
                      <Grid item xs={12} xl={12}>
                        <Button
                          className={classes.button}
                          type="button"
                          onClick={submitClipboardUpload}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </ThemeProvider>
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
