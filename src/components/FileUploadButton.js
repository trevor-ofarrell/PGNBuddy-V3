import React from 'react';
import Router, { useRouter } from 'next/router';

import {
  Button,
  makeStyles,
} from '@material-ui/core';

// TODO: add modal for file upload options

const useStyles = makeStyles((theme) => ({
  button: {
    height: 'auto',
    padding: '0.75em',
    marginTop: '2em',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    color: 'white',
    marginBottom: '1em',
    borderColor: 'white',
    width: '100%',
  },
}));

export const FileUploadButton = ({ userId, label, uploadFolderName }) => {
  const classes = useStyles();
  const router = useRouter();
  function convertToValidFilename(string) {
    return (string.replace(/[\/|\\:*?"<>]/g, ' '));
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleFileChosen = async (files) => {
    const uploadedFiles = {};
    for (let i = 0; i < files.length; i += 1) {
      ((file) => {
        const fileReader = new FileReader();
        const fileName = file.name;
        fileReader.onloadend = (event) => {
          const content = event.target.result;
          uploadedFiles[convertToValidFilename(fileName)] = content;
        };
        fileReader.readAsText(file);
      })(files[i]);
    }

    // sleep to wait for loop iterations to finish, need to fix later
    await sleep(250).then(() => {
      const data = {
        uploadedFiles,
        userId,
        uploadFolderName,
      };

      fetch(
        'api/uploadpgnfiles',
        { method: 'POST', body: JSON.stringify(data) },
      );

      Router.push('/dashboard');
      router.reload();
    });
  };

  return (
    <Button component="label" variant="outlined" className={classes.button}>
      <input
        accept=".pgn"
        type="file"
        style={{ display: 'none' }}
        id="fileInput"
        onChange={(event) => handleFileChosen(event.target.files)}
        multiple
        hidden
      />
      {label}
    </Button>
  );
};
