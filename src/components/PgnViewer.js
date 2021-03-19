import React, { useLayoutEffect } from 'react';
import * as uuid from 'uuid';
import Children from 'react-children-utilities';
import { pgnView } from '@mliebelt/pgn-viewer';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: [['white'], '!important'],
    textColor: [['white'], '!important'],
  },
}));

const PgnViewer = (props) => {
  const classes = useStyles();
  const gameDecription = Children.onlyText(props.children).replace(/ \{[\s\S]*?\}/g, '');
  const id = `board-${uuid.v4()}`;
  console.log(gameDecription);

  useLayoutEffect(() => {
    pgnView(id,
      {
        pgn: gameDecription,
        theme: 'brown',
        pieceStyle: 'wikipedia',
        timerTime: '1000',
        locale: 'pl',
        startPlay: 1,
        showResult: true,
        showFen: true,
      });
  });

  return (
    <div id={id} style={{ marginLeft: 'auto', marginRight: 'auto', color: 'white' }} className={classes.root} />
  );
};

export default PgnViewer;
