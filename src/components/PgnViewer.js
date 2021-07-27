import React, { useLayoutEffect } from 'react';
import * as uuid from 'uuid';
import Children from 'react-children-utilities';
import { pgnView } from '@mliebelt/pgn-viewer';
import { makeStyles } from '@material-ui/core/styles';

// Override PgnViwerJS styles to match PGNBuddy theme
const useStyles = makeStyles(() => ({
  '@global': {
    '.whole': {
      color: '#fafafa',
    },
    '.moves': {
      color: '#fafafa !important',
      fontSize: '1.2em',
      fontWeight: '500 !important',
    },
    '.moves .comment': {
      color: 'rgb(179, 176, 174) !important',
    },
    '.brown .blackHeader': {
      fontSize: '1.3em',
      color: '#fafafa !important',
    },
    '.brown .whiteHeader': {
      fontSize: '1.3em',
      color: '#fafafa !important',
    },
    '.brown .fen': {
      backgroundColor: 'rgb(69, 66, 64)',
      color: '#fafafa !important',
    },
    '.pgnvjs > div.buttons .pgnvbutton, .pgnvjs div.edit > .pgnvbutton': {
      backgroundColor: 'rgb(79, 76, 74) !important',
      color: 'rgb(179, 176, 174) !important',
      border: 'solid rgb(179, 176, 174) 1px !important',
      marginTop: '1em !important',
      marginBottom: '0.5em !important',
      paddingRight: '8px !important',
      paddingLeft: '8px !important',
      padding: '6px !important',
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
  const { children } = props;
  const gameDecription = Children.onlyText(children);
  const id = `board-${uuid.v4()}`;

  useLayoutEffect(() => {
    pgnView(id,
      {
        pgn: gameDecription,
        boardSize: '330px',
        theme: 'brown',
        pieceStyle: 'wikipedia',
        timerTime: '650',
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
