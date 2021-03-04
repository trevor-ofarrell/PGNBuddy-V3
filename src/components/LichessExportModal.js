import React, { useState } from 'react';
import {
  makeStyles, Button,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FullWidthTabs } from '.';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    textAlign: 'center',
    marginTop: '-4em',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '2.5vw',
      paddingRight: '2.5vw',
    },
  },
  paper: {
    backgroundColor: 'rgb(49, 46, 44)',
    border: '0px solid rgb(59, 56, 54)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    color: 'white',
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
}));

export const LichessExportModal = ({ userId, lichessUsername }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
      <Button className={classes.button} onClick={handleOpen}>
        Export PGNs from lichess.org
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
              choose lichess export option
            </h2>
            <FullWidthTabs userId={userId} lichessUsername={lichessUsername} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
