import redis from 'redis';
import bluebird from 'bluebird';

async function deletepgn(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    const { folderName } = req.body;
    const { pgnId } = req.body;

    console.log(req.body);

    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    cache.hdel(`${id}-${folderName}`, pgnId, (err, reply) => {
      if (!err) {
        if (reply === 1) {
          console.log(`${id} is deleted`);
        } else {
          console.log(`${id} doesn't exists`);
        }
      } else if (err) {
        console.log(err);
      } else {
        console.log('cache delete failed', err);
        cache.quit();
        return res.status(500).end();
      }
      cache.quit();
    });
    cache.quit();
    return res.status(200).end();
  }
}

export default deletepgn;
