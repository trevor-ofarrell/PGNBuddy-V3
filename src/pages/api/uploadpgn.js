import redis from 'redis';
import bluebird from 'bluebird';
import * as uuid from 'uuid';

import pgn2json from '../../../utils/pgntojson';

async function uploadpgn(req, res) {
  if (req.method === 'POST') {
    const {
      pgnName,
      folderName,
      userData,
      pgn,
    } = req.body;

    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    let pgnjson;
    const newPgn = pgn
      .replace(/ 1\/2(\r\n|\r|\n)/g, ' 1/2-1/2\n')
      .replace(/\[Result "1\/2"\]/g, '[Result "1/2-1/2"]');

    try {
      pgnjson = JSON.parse(pgn2json(newPgn));
    } catch {
      pgnjson = {
        str: {
          Variant: '',
          TimeControl: '',
          Opening: '',
          Black: '',
          White: '',
          BlackElo: '',
          WhiteElo: '',
        },
      };
    }

    const date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);

    const pgnProps = {
      name: pgnName === '' ? 'untitled.pgn' : pgnName,
      pgn_id: uuid.v4(),
      folder: folderName === '' ? `clipboard upload ${date}` : folderName,
      pgn: newPgn,
      moves: '',
      user_id: userData.id,
      user_email: '',
      iframe: '',
      rated: '',
      variant: pgnjson.str.Variant,
      speed: pgnjson.str.TimeControl,
      status: '',
      winner: '',
      opening: pgnjson.str.Opening,
      clock: '',
      black: pgnjson.str.Black,
      white: pgnjson.str.White,
      blackRating: pgnjson.str.BlackElo,
      whiteRating: pgnjson.str.WhiteElo,
      editable: true,
    };

    if (pgnProps) {
      await cache.saddAsync(`${userData.id}-folder-names`, pgnProps.folder);
      await cache.hsetnxAsync(`${userData.id}-${pgnProps.folder}`, `${pgnProps.pgn_id}`, JSON.stringify(pgnProps))
        .then(async (reply) => {
          if (reply !== 1) {
            cache.quit();
            return res.status(500).end();
          }
          cache.quit();
          return res.status(200).end();
        });
    } else {
      cache.quit();
      res.status(500).end();
    }

    cache.quit();
    return res.status(200).end();
  }
  return res.status(500).end();
}

export default uploadpgn;
