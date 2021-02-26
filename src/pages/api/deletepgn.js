import redis from 'redis';
import bluebird from 'bluebird';

async function deletepgn(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    const { folderName } = req.body;
    const { pgnId } = req.body;

    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    cache.hlen(`${id}-${folderName}`, async (error, number) => {
      if (number > 1) {
        cache.hdel(`${id}-${folderName}`, pgnId);
      } else {
        cache.srem(`${id}-folder-names`, folderName);
        cache.del(`${id}-${folderName}`);
      }
      cache.quit();
      return res.status(200).end();
    });
  }
  return res.status(500).end();
}

export default deletepgn;
