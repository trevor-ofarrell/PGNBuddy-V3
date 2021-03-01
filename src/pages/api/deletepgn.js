import redis from 'redis';
import bluebird from 'bluebird';

async function deletepgn(req, res) {
  bluebird.promisifyAll(redis.RedisClient.prototype);

  const cache = redis.createClient({
    port: process.env.LAMBDA_REDIS_PORT,
    host: process.env.LAMBDA_REDIS_ENDPOINT,
    password: process.env.LAMBDA_REDIS_PW,
  });

  if (req.method === 'POST') {
    const { id } = req.body;
    const { folderName } = req.body;
    const { pgnId } = req.body;

    cache.hlen(`${id}-${folderName}`, async (error, number) => {
      if (number > 1) {
        await cache.hdelAsync(`${id}-${folderName}`, pgnId, (err, reply) => {
          if (!err) {
            if (reply === 1) {
              res.status(200).end();
            } else {
              res.status(200).end();
            }
          } else if (err) {
            res.status(500).end();
          }
        }).then(() => {
          cache.quit();
          return res.status(200).end();
        });
      } else {
        await cache.sremAsync(`${id}-folder-names`, folderName);
        await cache.delAsync(`${id}-${folderName}`).then(() => {
          cache.quit();
          return res.status(200).end();
        });
      }
    });
  }
}

export default deletepgn;
