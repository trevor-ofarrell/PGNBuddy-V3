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
      fontWeight: '500 !important',
    },
    '.moves .comment': {
      color: 'rgb(179, 176, 174) !important',

    },
    '.brown .blackHeader': {
      fontSize: '1.3em',
    },
    '.brown .whiteHeader': {
      fontSize: '1.3em',
    },
    '.brown .fen': {
      backgroundColor: 'rgb(69, 66, 64)',
      color: '#fafafa',
    },
    'div.buttons > i.button': {
      backgroundColor: 'rgb(79, 76, 74) !important',
      color: 'rgb(179, 176, 174) !important',
      border: 'solid rgb(179, 176, 174) 1px !important',
      marginTop: '1em !important',
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
