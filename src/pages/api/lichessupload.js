import redis from 'redis';
import bluebird from 'bluebird';

const axios = require('axios');

async function lichessUpload(req, res) {
  if (req.method === 'POST') {
    let pgnName = req.body.name;
    let { gameString } = req.body;

    if (gameString.slice(0, 7) === 'lichess') {
      gameString = gameString.slice(12);
    } else if (gameString.slice(0, 5) === 'https') {
      gameString = gameString.slice(20);
    } else if (gameString.slice(0, 5) === 'http:') {
      gameString = gameString.slice(19);
    }

    if (gameString.length !== 8) {
      gameString = gameString.slice(0, 8);
    }

    let pgnFolder = req.body.folder;
    const { userData } = req.body;
    const iframeLink = `https://lichess.org/embed/${gameString}?theme=wood4&bg=dark`;
    let whitePlayer = '';
    let blackPlayer = '';

    const response = await axios.get(
      `https://lichess.org/game/export/${gameString}`,
      {
        params: {
          pgnInJson: 'true',
          clocks: 'true',
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (response) {
      bluebird.promisifyAll(redis.RedisClient.prototype);
      const cache = redis.createClient({
        port: process.env.LAMBDA_REDIS_PORT,
        host: process.env.LAMBDA_REDIS_ENDPOINT,
        password: process.env.LAMBDA_REDIS_PW,
      });

      if (!pgnFolder) {
        const date = new Date();
        date.setMilliseconds(0);
        date.setSeconds(0);
        pgnFolder = `lichess upload ${date}`;
      }

      if (!pgnName) {
        pgnName = `${response.data.opening.name} - ${response.data.variant} - ${response.data.speed} - id: ${gameString}`;
      }

      if (!response.data.players.black.user) { blackPlayer = 'None'; } else { blackPlayer = `${response.data.players.black.user.name} ${response.data.players.black.rating}`; }
      if (!response.data.players.white.user) { whitePlayer = 'None'; } else { whitePlayer = `${response.data.players.white.user.name} ${response.data.players.white.rating}`; }

      const pgn = {
        name: pgnName,
        pgn_id: gameString,
        folder: pgnFolder,
        pgn: response.data.pgn,
        moves: response.data.moves,
        user_id: userData.id,
        user_email: userData.email,
        iframe: iframeLink,
        rated: response.data.rated,
        variant: response.data.variant,
        speed: response.data.speed,
        status: response.data.status,
        winner: response.data.winner,
        opening: response.data.opening,
        clock: response.data.clock,
        black: blackPlayer,
        white: whitePlayer,
      };

      if (pgn) {
        await cache.saddAsync(`${userData.id}-folder-names`, pgn.folder);
        await cache.hsetnxAsync(`${userData.id}-${pgn.folder}`, `${gameString}`, JSON.stringify(pgn))
          .then(async (reply) => {
            if (reply !== 1) {
              cache.quit();
              return res.status(500).end();
            }
            cache.quit();
            return res.status(200).end();
          });
      } else {
        cache.quit();
        res.status(500).end();
      }
    } else {
      return res.status(405).end();
    }
  }
  return res.status(500).end();
}

export default lichessUpload;
