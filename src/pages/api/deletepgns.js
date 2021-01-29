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
              console.log(`${collectionPath} is deleted`);
            } else {
              console.log(`${collectionPath} doesn't exists`);
            }
          } else if (err) {
            console.log(err);
          } else {
            console.log('cache delete failed', err);
          }
        });
      });
    });
    console.log(collectionPath);
    cache.quit();
    return res.status(200).end();
  }
  return res.status(500).end();
}

export default deletepgns;
