import redis from 'redis';
import bluebird from 'bluebird';
import * as uuid from 'uuid';

import pgn2json from '../../../utils/pgntojson';

async function uploadpgnfile(req, res) {
  if (req.method === 'POST') {
    bluebird.promisifyAll(redis.RedisClient.prototype);

    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    const body = JSON.parse(req.body);
    const pgns = body.uploadedFiles;

    await Promise.all(pgns.map((pgn) => {
      const parsedPgn = pgn[1]
        .replace(/ 1\/2(\r\n|\r|\n)/g, ' 1/2-1/2\n')
        .replace(/\[Result "1\/2"\]/g, '[Result "1/2-1/2"]');

      let pgnjson;
      const split = parsedPgn.split(/\[Event /);

      if (split) {
        split.shift();
        // if pgn file contains multiple pgns don't add any pgn information,
        // as the information on each game will likley vary, from pgn to pgn.
        if (split.length > 1) {
          pgnjson = {
            str: {
              Variant: '',
              TimeControl: '',
              Opening: '',
              Black: '',
              White: '',
              BlackElo: '',
              WhiteElo: '',
            },
          };
        } else {
          try {
            pgnjson = JSON.parse(pgn2json(parsedPgn));
          } catch {
            pgnjson = {
              str: {
                Variant: '',
                TimeControl: '',
                Opening: '',
                Black: '',
                White: '',
                BlackElo: '',
                WhiteElo: '',
              },
            };
          }
        }
      }
      const currentPgn = {
        name: pgn[0],
        pgn_id: uuid.v4(),
        folder: body.uploadFolderName,
        pgn: parsedPgn,
        moves: '',
        user_id: body.userId,
        user_email: '',
        iframe: '',
        rated: '',
        variant: pgnjson.str.Variant,
        speed: pgnjson.str.TimeControl,
        status: '',
        winner: '',
        opening: pgnjson.str.Opening,
        clock: '',
        black: pgnjson.str.Black,
        white: pgnjson.str.White,
        blackRating: pgnjson.str.BlackElo,
        whiteRating: pgnjson.str.WhiteElo,
        editable: true,
      };
      return currentPgn;
    })).then(async (pgnList) => {
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
                  `${elem.pgn_id}`,
                  JSON.stringify(elem),
                ),
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
                `${elem.pgn_id}`,
                JSON.stringify(elem),
              ),
            );
          });
          await Promise.all(promises);

          cache.quit();
          return res.status(200).end();
        });
      }
    });
  }
  return res.status(500).end();
}

export default uploadpgnfile;
