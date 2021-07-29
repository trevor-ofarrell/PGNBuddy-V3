import React, { useState } from 'react';
import * as ChessJS from 'chess.js';
import {
  makeStyles,
  Button,
  Grid,
  TextField,
  Typography,
  createTheme,
  Card,
} from '@material-ui/core';
import {
  ThemeProvider,
} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Link from 'next/link';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '5vw',
      paddingRight: '5vw',
    },
  },
  textbottom: {
    textAlign: 'center',
    marginBottom: '1em',
    wordBreak: 'break-all',
    padding: '2em',
    paddingTop: '0.5em',
    [theme.breakpoints.down('sm')]: {
      padding: '0em',
      paddingBottom: '1em',
    },
  },
  texttop: {
    textAlign: 'center',
    wordBreak: 'break-all',
    padding: '2em',
    paddingBottom: '0',
    [theme.breakpoints.down('sm')]: {
      padding: '0em',
      paddingTop: '1em',
      paddingBottom: '1em',
    },
  },
  button: {
    width: '100%',
    height: 'auto',
    padding: '1.5em',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    color: 'white',
    marginBottom: '0.65em',
    background: 'rgb(59, 56, 54)',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
    [theme.breakpoints.down('md')]: {
      background: 'rgb(39, 36, 34)',
      marginBottom: '0.6em',
    },
  },
  submit: {
    width: '100%',
    color: '#fafafa',
  },
  paper: {
    backgroundColor: 'rgb(49, 46, 44)',
    border: '0px solid rgb(49, 46, 44)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    outline: 'none',
    color: '#fafafa',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  textfield: {
    width: '100%',
    color: '#fafafa',
    fontColor: '#fafafa',
  },
  card: {
    marginTop: '0em',
    backgroundColor: 'rgb(69, 66, 64)',
    margin: '1em',
    [theme.breakpoints.down('xs')]: {
      margin: '0.5em',
    },
  },
  label: {
    color: 'rgb(119, 116, 114)',
    fontWeight: '300',
  },
  input: {
    color: '#fafafa',
    fontWeight: '300',
  },
  image: {
    height: 'auto',
    maxHeight: '70vh',
    maxWidth: '80vw',
    [theme.breakpoints.down('md')]: {
      maxHeight: '70vh',
      maxWidth: '90vw',
    },
  },
}));

const textFieldTheme = createTheme({
  palette: {
    primary: { main: '#fafafa' },
  },
});

export const FenToDiagramModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [FEN, setFEN] = useState('');
  const [base64, setBase64] = useState('');

  const handleOpen = () => {
    setBase64('');
    setFEN('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createDiagram = () => {
    const checkedFEN = FEN.replace(', ', ',')
      .split(',')
      .filter((fen) => new Chess().load(fen) === true)
      .map((item) => {
        const chess = new Chess();
        chess.load(item);
        return [item, chess.turn()];
      })
      .slice(0, 10);

    fetch(`https://d9.wtf/screenshot?fen=${checkedFEN}`)
      .then((response) => response.blob())
      .then((response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          const base64data = reader.result;
          setBase64(base64data);
        };
      });
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      <Button className={classes.button} onClick={handleOpen}>
        Create PNG diagram from FEN(s)
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {base64 === '' ? (
          <Fade in={open}>
            <div className={classes.paper}>
              <Typography variant="h5" className={classes.texttop}>
                Create PNG diagram from 1-10 FEN string(s).
              </Typography>
              <Typography variant="h5" className={classes.textbottom}>
                Seperate entries with a comma.
              </Typography>
              <ThemeProvider theme={textFieldTheme}>
                <Card elevation={0} className={classes.card}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      label="Enter FEN(s)"
                      type="text"
                      variant="filled"
                      className={classes.textfield}
                      onChange={(event) => { setFEN(event.target.value); }}
                      value={FEN}
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
                    <Link href="/">
                      <div>
                        <Button
                          className={classes.submit}
                          onClick={createDiagram}
                        >
                          Create PNG diagram
                        </Button>
                      </div>
                    </Link>
                  </Grid>
                </Card>
              </ThemeProvider>
            </div>
          </Fade>
        ) : (
          <img
            src={base64}
            alt="chess diagram made from the FEN strings submitted"
            className={classes.image}
          />
        )}
      </Modal>
    </div>
  );
};
