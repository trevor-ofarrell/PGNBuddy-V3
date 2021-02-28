import redis from 'redis';
import bluebird from 'bluebird';

async function uploadpgnfile(req, res) {
  if (req.method === 'POST') {
    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    const body = JSON.parse(req.body);
    const pgns = Object.entries(body.uploadedFiles).map(([key, value]) => [key, value]);

    const pgnList = [];
    pgns.forEach((pgn) => {
      const properties = {
        name: pgn[0],
        pgn_id: pgn[0],
        folder: body.uploadFolderName,
        pgn: pgn[1],
        moves: '',
        user_id: body.userId,
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
      pgnList.push(properties);
    });

    if (body.uploadFolderName && body.userId) {
      await cache.existsAsync(`${body.userId}-${body.uploadFolderName}`).then(async (reply) => {
        const promises = [];
        // if folder doesnt exist
        if (reply !== 1) {
          await cache.saddAsync(`${body.userId}-folder-names`, body.uploadFolderName);
          pgnList.forEach((elem) => {
            promises.push(  
              cache.hsetAsync(
                `${body.userId}-${body.uploadFolderName}`,
                `${elem.name}`,
                JSON.stringify(elem),
              ).then(async (determinationReply) => {
                if (determinationReply !== 1) {
                  console.log('hsetnx set failed');
                } else {
                  console.log('hsetnx succeded');
                }
              }),
            );
          });
          await Promise.all(promises);

          cache.quit();
          return res.status(200).end();
        }

        await cache.saddAsync(`${body.userId}-folder-names`, body.uploadFolderName);
        pgnList.forEach((elem) => {
          promises.push(
            cache.hsetnxAsync(
              `${body.userId}-${body.uploadFolderName}`,
              `${elem.name}`,
              JSON.stringify(elem),
            ).then(async (determinationReply2) => {
              if (determinationReply2 !== 1) {
                console.log('hsetnx set failed');
              } else {
                console.log('hsetnx succeded');
              }
            }),
          );
        });
        await Promise.all(promises);

        cache.quit();

        return res.status(200).end();
      });
    }
  }
  return res.status(500).end();
}

export default uploadpgnfile;
