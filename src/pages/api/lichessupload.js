const axios = require('axios');
import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function lichessUpload(req, res) {
  if (req.method === 'POST') {
    let pgn_name = req.body.name    
    let game_string = req.body.game_string
    let folders = new Set()
    console.log([pgn_name, game_string])
    console.log(game_string.slice(0,7))

    if (game_string.slice(0,7) == 'lichess') {
      game_string = game_string.slice(12)
      console.log("game string 1" + game_string)
    }

    else if (game_string.slice(0,5) == 'https') {
      console.log(game_string.slice(20))
      game_string = game_string.slice(20)
      console.log("game string 2" + game_string)
    }

    else if (game_string.slice(0,5) == 'http:') {
      console.log(game_string.slice(19))
      game_string = game_string.slice(19)
      console.log("game string 3" + game_string)
    }

    if (game_string.length !== 8) {
      game_string = game_string.slice(0,8)
      console.log("game string 4" + game_string)
    }

    let pgn_folder = req.body.folder
    let user_data = req.body.user_data
    let iframeLink = "https://lichess.org/embed/" + game_string + "?theme=wood4&bg=dark"

    let response = await axios.get(
      "https://lichess.org/game/export/" + game_string,
      { 
        params: {
          pgnInJson: "true",
          clocks: "true",
        },
        headers: {
          "Accept": "application/json" 
        },
      }
    );

    if (response) {
      console.log("res received", response.data)

        bluebird.promisifyAll(redis.RedisClient.prototype);
        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        let pgn = {
          name: pgn_name,
          pgn_id: game_string,
          folder: pgn_folder,
          pgn: response.data.pgn,
          moves: response.data.moves,
          user_id: user_data.id,
          user_email: user_data.email,
          iframe: iframeLink,
          rated: response.data.rated,
          variant: response.data.variant,
          speed: response.data.speed,
          status: response.data.status,
          winner: response.data.winner,
          opening: response.data.opening,
          clock: response.data.clock,
          players: response.data.players,
        }

        console.log(pgn)

        folders.add(response.folder)

        if (pgn) {
          let time = new Date
          await cache.saddAsync(`${user_data.id}-folder-names`, pgn.folder)
          await cache.hsetnxAsync(`${user_data.id}-${pgn.folder}`, `${game_string}-${time}`, JSON.stringify(pgn))
            .then(async reply => {
              if (reply !== 1) {
                cache.quit()
                return res.status(500).end()
              } else {
                cache.quit()
                return res.status(200).end()
              }
            })
        }
        else {
          cache.quit()
          res.status(500).end()
        }
    } else {
      return res.status(405).end()
    }
  }
}

export default lichessUpload;
