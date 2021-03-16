import redis from 'redis';
import bluebird from 'bluebird';

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
      variant: '',
      speed: '',
      status: '',
      winner: '',
      opening: '',
      clock: '',
      black: '',
      white: '',
      blackRating: '',
      whiteRating: '',
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
