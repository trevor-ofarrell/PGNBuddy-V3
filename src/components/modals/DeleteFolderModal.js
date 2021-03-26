import React, { useState } from 'react';
import {
  makeStyles, Button, Grid, Typography,
  ButtonGroup,
  Tooltip,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '2vw',
      paddingRight: '2vw',
    },
  },
  paper: {
    backgroundColor: 'rgb(59, 56, 54)',
    border: '0px solid rgb(59, 56, 54)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: '0.5em',
    color: 'white',
    borderColor: 'white',
    padding: '1em',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
  },
  buttongroup: {
    width: '100%',
  },
  icon: {
    marginLeft: '2vw',
  },
  text: {
    textAlign: 'center',
    marginBottom: '1em',
    wordBreak: 'break-all',
    padding: '2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0em',
      paddingTop: '1em',
      paddingBottom: '1em',
    },
  },
}));

export const DeleteFolderModal = ({ folderName, id }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const data = {
      id,
      folderName,
    };
    await fetch('/api/deletefolder', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    router.reload();
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      <Tooltip title="delete folder" placement="left">
        <DeleteForeverIcon
          type="button"
          onClick={handleOpen}
          className={classes.icon}
          style={{
            fill: '#fff', marginRight: '0.75vw', marginTop: 'auto', marginBottom: 'auto',
          }}
        />
      </Tooltip>
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
            <Typography variant="h5" className={classes.text}>
              Delete folder
              {' '}
              {'"'}
              {folderName}
              {'"'}
              ?
            </Typography>
            <Grid container>
              <Grid item sm={1} xl={3} />
              <Grid item xs={12} sm={10} xl={6}>
                <ButtonGroup className={classes.buttongroup}>
                  <Button variant="outlined" className={classes.button} onClick={handleClose}>
                    cancel
                  </Button>
                  <Button variant="outlined" className={classes.button} onClick={handleDelete}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item sm={1} xl={3} />
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
