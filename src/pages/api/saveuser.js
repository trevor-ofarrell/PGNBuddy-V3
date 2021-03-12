import redis from 'redis';
import bluebird from 'bluebird';

async function saveuser(req, res) {
  if (req.method === 'POST') {
    const { username } = req.body;
    const { email } = req.body;

    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    await cache.hsetAsync('users', email, username);

    cache.quit();
    return res.status(200).end();
  }
  return res.status(500).end();
}

export default saveuser;
