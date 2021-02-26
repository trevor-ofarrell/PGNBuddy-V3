import React, { useState } from 'react';
import {
  makeStyles, Button, Grid, TextField,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FileUploadButton } from '.';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    textAlign: 'center',
  },
  paper: {
    backgroundColor: 'rgb(59, 56, 54)',
    border: '0px solid rgb(59, 56, 54)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    color: 'white',
  },
  button: {
    width: '100%',
    marginTop: '1.5em',
    marginBottom: '1em',
    color: 'white',
    borderColor: 'white',
  },
  icon: {
    marginLeft: '3vw',
    [theme.breakpoints.up('xl')]: {
      marginLeft: '2.5vw',
    },
  },
  button2: {
    width: '100%',
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
    [theme.breakpoints.down('md')]: {
      background: 'rgb(39, 36, 34)',
      marginBottom: '0.6em',
    },
  },
  textfield: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    width: '100%',
    color: 'white',
    marginTop: '0.5em',
  },
}));

export const NameFolderModal = ({ userId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [uploadFolderName, setFolderName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      <Button className={classes.button2} onClick={handleOpen}>
        Upload PGN files
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
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Enter name for new, or existing folder.
            </h2>
            <p id="transition-modal-description">Leave blank for default naming.</p>
            <TextField
              id="outlined-basic"
              label="folder"
              variant="outlined"
              className={classes.textfield}
              InputLabelProps={{
                style: { color: '#909090' },
              }}
              inputProps={{
                style: { color: 'white' },
              }}
              value={uploadFolderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Grid container>
              <Grid item xs={3} xl={3} />
              <Grid item xs={6} xl={6}>
                <FileUploadButton label="select PGN files" userId={userId} uploadFolderName={uploadFolderName} />
              </Grid>
              <Grid item xs={3} xl={3} />
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
