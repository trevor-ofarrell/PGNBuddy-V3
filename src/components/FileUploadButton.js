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

  const handleFileChosen = async (files) => {
    const promises = [];
    for (const file of files) {
      const filePromise = new Promise((resolve) => {
        const reader = new FileReader();
        const fileName = file.name;
        reader.readAsText(file);
        reader.onload = () => resolve([fileName, reader.result]);
      });
      promises.push(filePromise);
    }
    Promise.all(promises).then((fileContents) => {
      const data = {
        uploadedFiles: fileContents,
        userId,
        uploadFolderName,
      };
      fetch(
        'api/uploadpgnfiles',
        { method: 'POST', body: JSON.stringify(data) },
      ).then(() => {
        Router.push('/dashboard');
        router.reload();
      });
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
