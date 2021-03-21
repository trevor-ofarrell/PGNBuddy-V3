import React, { useLayoutEffect } from 'react';
import * as uuid from 'uuid';
import Children from 'react-children-utilities';
import { pgnView } from '@mliebelt/pgn-viewer';
import { makeStyles } from '@material-ui/core/styles';

// Override PgnViwerJS styles to match PGNBuddy theme
const useStyles = makeStyles(() => ({
  '@global': {
    '.whole': {
      color: 'white',
    },
    '.moves': {
      color: 'white !important',
      fontSize: '1.2em',
    },
    '.moves .comment': {
      color: 'rgb(169, 166, 164) !important',
      
    },
    '.brown .blackHeader': {
      fontSize: '1.3em',
    },
    '.brown .whiteHeader': {
      fontSize: '1.3em',
    },
  },
}));

const PgnViewer = (props) => {
  const classes = useStyles();
  const { children, size } = props;
  const gameDecription = Children.onlyText(children).replace(/ \{[\s\S]*?\}/g, '');
  const id = `board-${uuid.v4()}`;

  useLayoutEffect(() => {
    pgnView(id,
      {
        pgn: gameDecription,
        boardSize: '330px',
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
    <div id={id} style={{ marginLeft: 'auto', marginRight: 'auto' }} />
  );
};

export default PgnViewer;
