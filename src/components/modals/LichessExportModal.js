import React, { useState } from 'react';
import {
  makeStyles, Button,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { LichessImportTabs } from '..';

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
    border: '0px solid rgb(49, 46, 44)',
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
  const [open2, setOpen2] = useState(false);
  const [statusCode, setStatus] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRateLimitDialog = (status) => {
    setOpen2(true);
    setStatus(status);
  };

  const handleRateLimitDialogClose = () => {
    setOpen2(false);
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      <Button className={classes.button} onClick={handleOpen}>
        Import PGNs from lichess.org
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
              choose lichess import option
            </h2>
            <LichessImportTabs
              userId={userId}
              lichessUsername={lichessUsername}
              handleClose={handleClose}
              handleRateLimitDialog={handleRateLimitDialog}
            />
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open2}
        onClose={handleRateLimitDialogClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <div className={classes.paper}>
            {statusCode === 429
              ? (
                <h2 id="transition-modal-title">
                  Rate limit reached.
                  Please wait 60 seconds before requesting the lichess PGN exports again.
                </h2>
              )
              : (
                <h2 id="transition-modal-title">
                  Rate limit reached.
                  Please wait 30 seconds before requesting the lichess PGN exports again.
                </h2>
              )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
