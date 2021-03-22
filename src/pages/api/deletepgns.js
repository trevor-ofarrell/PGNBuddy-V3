import redis from 'redis';
import bluebird from 'bluebird';

async function deletepgns(req, res) {
  if (req.method === 'POST') {
    const { collectionPath } = req.body;

    bluebird.promisifyAll(redis.RedisClient.prototype);

    const userFolders = [];

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    await cache.smembersAsync(`${collectionPath}-folder-names`).then(async (names) => {
      await names.forEach((name) => {
        userFolders.push(name);
      });

      cache.del(`${collectionPath}-folder-names`);
      userFolders.forEach((folder) => {
        cache.del(`${collectionPath}-${folder}`, (err, reply) => {
          if (!err) {
            if (reply === 1) {
              res.status(200).end();
            } else {
              res.status(200).end();
            }
          } else if (err) {
            res.status(500).end();
          }
        });
      });
    });
    cache.quit();
    return res.status(200).end();
  }
  return res.status(500).end();
}

export default deletepgns;
