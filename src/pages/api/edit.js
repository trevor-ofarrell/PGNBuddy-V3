import redis from 'redis';
import bluebird from 'bluebird';

async function edit(req, res) {
  if (req.method === 'POST') {
    const { newEdit } = req.body;
    const { entryName } = req.body;
    const { id } = req.body;
    const { pgnId } = req.body;
    const { folderName } = req.body;

    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    switch (entryName) {
      case 'folder': {
        let pgnList = await cache.hgetallAsync(`${id}-${folderName}`);
        pgnList = Object.values(pgnList);
        await cache.renameAsync(`${id}-${folderName}`, `${id}-${newEdit}`).then(async () => {
          pgnList.forEach(async (pgn) => {
            const editedPgn = JSON.parse(pgn);
            editedPgn.folder = newEdit;
            await cache.hsetAsync(`${id}-${newEdit}`, editedPgn.pgn_id, JSON.stringify(editedPgn));
          });
          await cache.sremAsync(`${id}-folder-names`, folderName);
          await cache.saddAsync(`${id}-folder-names`, newEdit);
        });
        break;
      }
      case 'PGN': {
        await cache.hgetAsync(`${id}-${folderName}`, pgnId).then(async (pgn) => {
          const editedPgn = JSON.parse(pgn);
          editedPgn.name = newEdit;
          await cache.hsetAsync(`${id}-${folderName}`, pgnId, JSON.stringify(editedPgn));
        });
        break;
      }
      default:
      // do nothing
    }
    cache.quit();
    return res.status(200).end();
  }
  return res.status(500).end();
}

export default edit;
