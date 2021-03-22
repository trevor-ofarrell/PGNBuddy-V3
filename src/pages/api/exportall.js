import redis from 'redis';
import bluebird from 'bluebird';

import rateLimit from '../../../utils/ratelimit';
import NdjsonStreamer from '../../../utils/ndjsonStreamer';

const limiter = rateLimit({
  interval: 65 * 1000,
  uniqueTokenPerInterval: 1,
});

async function exportAll(req, res) {
  if (req.method === 'POST') {
    const { lichessUsername } = req.body;
    const { folder } = req.body;
    const startDate = new Date(req.body.startDate).getTime();
    const endDate = new Date(req.body.endDate).getTime();
    const { userData } = req.body;
    let opening = '';
    let winner = '';
    let whitePlayer = '';
    let blackPlayer = '';
    let whiteRating = '';
    let blackRating = '';
    let clock = {};

    bluebird.promisifyAll(redis.RedisClient.prototype);
    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    const usersFolders = [];
    const pgnList = [];

    let uploadFolder;
    let i = 0;

    const eventStreamer = new NdjsonStreamer({

      url: `https://lichess.org/api/games/user/${lichessUsername}?opening=true&since=${startDate}&until=${endDate}&max=100&pgnInJson=true`,
      token: process.env.LICHESS_API_TOKEN,
      timeout: 10000,

      timeoutCallback: () => res.status(405).end(),
      callback: (obj) => {
        if (obj.opening) {
          opening = obj.opening.name;
        } else {
          opening = 'No known opening';
        }

        if (obj.winner) {
          winner = obj.winner;
        } else if (obj.status !== 'outoftime') {
          winner = `No winner. Game resulted in a ${obj.status}`;
        } else {
          winner = 'No winner. Game resulted in a draw opon timeout';
        }

        if (obj.clock) {
          clock = obj.clock;
        } else {
          clock = 'No set time control';
        }

        if (folder) {
          uploadFolder = folder;
        } else {
          const date = new Date();
          date.setMilliseconds(0);
          date.setSeconds(0);
          uploadFolder = `lichess upload ${date}`;
        }

        if (!obj.players.black.user) { blackPlayer = 'None'; blackRating = ''; } else {
          blackPlayer = obj.players.black.user.name;
          blackRating = obj.players.black.rating;
        }
        if (!obj.players.white.user) { whitePlayer = 'None'; whiteRating = ''; } else {
          whitePlayer = obj.players.white.user.name;
          whiteRating = obj.players.white.rating;
        }

        const pgn = {
          name: `${opening} - ${obj.variant} - ${obj.speed} - id: ${obj.id}`,
          pgn_id: obj.id,
          folder: uploadFolder,
          pgn: obj.pgn,
          moves: obj.moves,
          user_id: userData.id,
          user_email: userData.email,
          iframe: `https://lichess.org/embed/${obj.id}?theme=wood4&bg=dark`,
          rated: obj.rated,
          variant: obj.variant,
          speed: obj.speed,
          status: obj.status,
          winner,
          opening,
          clock,
          black: blackPlayer,
          white: whitePlayer,
          blackRating,
          whiteRating,
          lichess: true,
          editable: true,
        };

        pgnList.push(pgn);
        i += 1;

        if (usersFolders) {
          if (!usersFolders.includes(pgn.folder)) {
            usersFolders.push(pgn.folder);
          }
        } else {
          usersFolders.push(pgn.folder);
        }
      },
      endcallback: async (response) => {
        const updateFolders = async (folders, pgns, uid) => {
          if (folders) {
            folders.forEach(async (currentFolder) => {
              await cache.existsAsync(`${uid}-${currentFolder}`).then(async (reply) => {
                const promises = [];
                // if folder doesnt exist
                if (reply !== 1) {
                  await cache.saddAsync(`${uid}-folder-names`, currentFolder);
                  pgns.forEach(async (elem) => {
                    promises.push(
                      await cache.hsetAsync(
                        `${uid}-${currentFolder}`,
                        `${elem.pgn_id}`,
                        JSON.stringify(elem),
                      ),
                    );
                  });
                  await Promise.all(promises);

                  cache.quit();
                  return res.status(200).end();
                }

                await cache.saddAsync(`${uid}-folder-names`, currentFolder);
                pgns.forEach(async (elem) => {
                  promises.push(
                    await cache.hsetnxAsync(
                      `${uid}-${currentFolder}`,
                      `${elem.pgn_id}`,
                      JSON.stringify(elem),
                    ),
                  );
                });
                await Promise.all(promises);

                cache.quit();
                return res.status(200).end();
              });
            });
          } else {
            return res.status(500).end();
          }
        };
        if (response.status === 429) {
          try {
            await limiter.check(res, 0, 'CACHE_TOKEN');
          } catch {
            return res.status(429).end();
          }
        } else {
          try {
            // limit this page from calling this function more than once every 30 sec
            // to adhere to the rate limiting rules of the lichess.org api
            await limiter.check(res, 3, 'CACHE_TOKEN');
            await updateFolders(usersFolders, pgnList, userData.id);
          } catch (err) {
            await updateFolders(usersFolders, pgnList, userData.id);
            return res.status(420).end();
          }
        }
      },
    });
    eventStreamer.stream();
  }
}

export default exportAll;
