import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  Grid,
  Typography,
  createMuiTheme,
  TextField,
  Tooltip,
  Card,
} from '@material-ui/core';
import {
  ThemeProvider,
} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'rgb(59, 56, 54)',
    border: '0px solid rgb(59, 56, 54)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 6, 3),
    outline: 'none',
    color: 'white',
    textAlign: 'center',
  },
  card: {
    marginTop: '0em',
    backgroundColor: 'rgb(69, 66, 64)',
    margin: '1em',
  },
  button: {
    width: '100%',
    color: '#fafafa',
  },
  buttongroup: {
    width: '100%',
  },
  icon: {
    marginLeft: '1vw',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '2vw',
    },
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
  textfield: {
    width: '100%',
    color: '#fafafa',
    fontColor: '#fafafa',
  },
  label: {
    color: 'rgb(119, 116, 114)',
    fontWeight: '300',
  },
  input: {
    color: '#fafafa',
    fontWeight: '300',
  },
}));

const textFieldTheme = createMuiTheme({
  palette: {
    primary: { main: '#fafafa' },
  },
});

export const EditModal = ({
  id, entryName, folderName, pgnName, pgnId,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitEdit = async (event) => {
    event.preventDefault();

    const data = {
      id,
      entryName,
      newEdit: edit,
      pgnName,
      pgnId,
      folderName,
    };

    await fetch('/api/edit', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then(async () => {
        if (entryName === 'PGN') {
          const data2 = {
            id,
            pgnId: pgnName,
            folderName,
          };
          await fetch('/api/deletepgn', { method: 'POST', body: JSON.stringify(data2), headers: { 'Content-Type': 'application/json' } });
        }
      });
    router.reload();
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      <Tooltip title={`edit ${entryName} name`} placement="left">
        <EditIcon style={{ fill: '#ffffff', marginTop: '2px' }} type="button" onClick={handleOpen} className={classes.icon} />
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
              Edit
              {' '}
              {entryName}
              {' '}
              name
            </Typography>
            <Grid container>
              <ThemeProvider theme={textFieldTheme}>
                <Grid item xs={12} sm={12} xl={12}>
                  <Card elevation={0} className={classes.card}>
                    <TextField
                      id="outlined-basic"
                      label={`${entryName} name`}
                      variant="filled"
                      className={classes.textfield}
                      InputLabelProps={{
                        className: classes.label,
                      }}
                      InputProps={{
                        className: classes.input,
                      }}
                      value={edit}
                      onChange={(e) => setEdit(e.target.value)}
                    />
                    <Grid container>
                      <Grid item xs={12} xl={12}>
                        <Button
                          className={classes.button}
                          type="button"
                          onClick={submitEdit}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </ThemeProvider>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
