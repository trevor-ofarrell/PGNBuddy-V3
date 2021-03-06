import redis from 'redis';
import bluebird from 'bluebird';

async function deletefolder(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    const { folderName } = req.body;

    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    await cache.sremAsync(`${id}-folder-names`, folderName);

    cache.del(`${id}-${folderName}`, (err, reply) => {
      if (!err) {
        if (reply === 1) {
          res.status(200).end();
        } else {
          res.status(200).end();
        }
      } else if (err) {
        res.status(500).end();
      } else {
        cache.quit();
        return res.status(500).end();
      }
      cache.quit();
    });
    cache.quit();
    return res.status(200).end();
  }
  return res.status(500).end();
}

export default deletefolder;
