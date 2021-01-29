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

    await cache.hsetAsync('users', email, username).then(async (reply) => {
      if (reply !== 1) {
        console.log('hset set failed');
      } else {
        console.log('hset succeded', username);
      }
    });

    cache.quit();
    return res.status(200).end();
  }
}

export default saveuser;
