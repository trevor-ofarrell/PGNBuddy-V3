import React, { useState } from 'react';
import {
  makeStyles,
  Button,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { PgnUploadTabs } from '..';

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
  button: {
    width: '100%',
    height: 'auto',
    padding: '1.5em',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    color: '#fafafa',
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
  paper: {
    backgroundColor: 'rgb(49, 46, 44)',
    border: '0px solid rgb(49, 46, 44)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    outline: 'none',
    color: '#fafafa',
  },
}));

export const UploadPgnModal = ({ userId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxRequestErrorOpen = () => {
    setOpen2(true);
  };

  const handleMaxRequestErrorClose = () => {
    setOpen2(false);
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      <Button className={classes.button} onClick={handleOpen}>
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
            <PgnUploadTabs
              userId={userId}
              handleMaxRequestErrorOpen={handleMaxRequestErrorOpen}
              handleClose={handleClose}
            />
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="max request size"
        aria-describedby="Max database request size reached"
        className={classes.modal}
        open={open2}
        onClose={handleMaxRequestErrorClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Max request size exceeded
              (1MB per PGN file)
            </h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
