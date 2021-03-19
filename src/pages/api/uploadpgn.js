import redis from 'redis';
import bluebird from 'bluebird';

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

    const pgnjson = JSON.parse(pgn2json(pgn));

    const pgnProps = {
      name: pgnName,
      pgn_id: pgnName,
      folder: folderName,
      pgn,
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
    };

    if (pgnProps) {
      await cache.saddAsync(`${userData.id}-folder-names`, pgnProps.folder);
      await cache.hsetnxAsync(`${userData.id}-${pgnProps.folder}`, `${pgnName}`, JSON.stringify(pgnProps))
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
