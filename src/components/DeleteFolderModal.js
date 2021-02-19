import React, { useState } from 'react';
import { makeStyles, Button, Grid } from '@material-ui/core';
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
    marginLeft: '2vw',
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
      <DeleteForeverIcon style={{ fill: '#ffffff', marginTop: '2px' }} type="button" onClick={handleOpen} className={classes.icon} />
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
              Delete folder
              {' '}
              {'"'}
              {folderName}
              {'"'}
              ?
            </h2>
            <p id="transition-modal-description">Are you sure? The data cannot be recovered.</p>
            <Grid container>
              <Grid item xs={3} xl={3} />
              <Grid item xs={6} xl={6}>
                <Button variant="outlined" className={classes.button} onClick={handleDelete}>
                  Yes I&#39;m Sure
                </Button>
              </Grid>
              <Grid item xs={3} xl={3} />
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
