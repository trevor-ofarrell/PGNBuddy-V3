/* @module Chess PGN Parser, @version 1.3.7, @copyright Aditya D.S. 2020, @license MIT */
/*
    This file has been modified by Trevor O'Farrell for use in PGNBuddy under the AGPL licence
    link to original file: https://github.com/Aditya-ds-1806/Chess-PGN-Parser/blob/master/dist/parser.js
*/

// returns pgn line-by-line array after filtering out comments (%)
const removeEscapeMechanism = (pgn) => pgn.filter((line) => line.trim()[0] !== '%');

// returns an array containing an STR object and a string containing the movetext
const getStrAndStringifyMoves = (pgn) => {
  const str = {};
  for (let i = 0; i < pgn.length; i += 1) {
    const line = pgn[i];
    if (line[0] === '[') {
      const tag = line.substring(1, line.indexOf(' '));
      const value = line.substring(line.indexOf(' ') + 2, line.length - 2);
      str[tag] = value;
    } else if (line[0] !== '[' && line.trim() !== '') {
      const moves = pgn.slice(pgn.indexOf(line)).join(' ').trim().split('');
      return [str, moves];
    }
  }
};

// returns an object that contains the NAG and corresponding move
const getNags = (moves, movPos) => {
  const temp = [];
  return moves.filter((move) => move.includes('$')).map((move) => {
    let prev = 0;
    if (temp.length) {
      prev = temp[temp.length - 1];
    }
    const count = movPos.filter((i) => i < moves.indexOf(move, prev));
    temp.push(count[count.length - 1]);
    return {
      moveCount: count.length,
      value: move,
    };
  });
};

// returns an array of objects containing the annotation and corresponding move position
const getCommentary = (moves, moveClone, movPos) => {
  const comments = [];
  while (moves.indexOf('{') !== -1) {
    const commentStartPos = moves.indexOf('{');
    const commentEndPos = moves.indexOf('}');
    const comment = moves.splice(commentStartPos, commentEndPos - commentStartPos + 2).join('');
    const commentIndex = moveClone.indexOf(comment.split(' ')[0]);
    comments.push({
      moveCount: movPos.filter((ind) => ind < commentIndex).length,
      comment: comment.substring(1, comment.length - 2),
    });
  }
  return comments;
};

const pgn2json = (pgnText) => {
  let pgn = pgnText.split('\n');
  const game = {
    str: {},
    moves: [],
    annotations: [],
    nag: [],
  };
  let moves; const
    movPos = [];

  pgn.forEach((_, i, pgn) => pgn[i] = pgn[i].trim().replace('\r', ''));
  pgn = removeEscapeMechanism(pgn);
  [game.str, moves] = getStrAndStringifyMoves(pgn);
  const moveClone = moves.join('').split(' ');
  for (let i = 1; moveClone.includes(`${i}.`); i += 1) {
    movPos.push(moveClone.indexOf(`${i}.`));
  }

  game.nag = getNags(moveClone, movPos);
  game.annotations = getCommentary(moves, moveClone, movPos);

  moves = moves.join('').split(' ');
  moves = moves.filter((val) => !val.includes('.') && !val.includes('$'));
  moves.pop();
  game.moves = moves;
  return JSON.stringify(game, null, 4);
};

export default pgn2json;
