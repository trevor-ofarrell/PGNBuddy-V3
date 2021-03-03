import redis from 'redis';
import bluebird from 'bluebird';

// TODO: add error handling for when no games can be exported

class NdjsonStreamer {
  constructor(props) {
    this.props = props || {};
    this.token = this.props.token;
    this.streaming = false;
  }

  close() {
    if (!this.streaming) {
      return;
    }

    this.streaming = false;

    if (this.readable) {
      this.readable.destroy();
      this.readable = null;
      console.log('stream closed', this.props.url);
    }
  }

  stream() {
    this.streaming = true;
    this.readable = null;
    const headers = {
      Accept: 'application/x-ndjson',
    };

    if (this.token) headers.Authorization = `Bearer ${this.token}`;

    let lastTick = new Date().getTime();

    if (this.props.timeout) {
      const checkInterval = setInterval(() => {
        if ((new Date().getTime() - lastTick) > this.props.timeout * 1000) {
          clearInterval(checkInterval);
          if (this.props.timeoutCallback) this.props.timeoutCallback();
        }
      }, this.props.timeout / 3);
    }

    let buffer = '';

    console.log('streamNdjson', this.props);

    fetch(this.props.url, {
      headers,
    })
      .then((response) => {
        console.log('stream started', this.props.url);
        this.readable = response.body;
        this.readable.on('end', () => {
          if (this.props.endcallback) this.props.endcallback();
        });

        this.readable.on('data', (chunk) => {
          lastTick = new Date().getTime();

          buffer += chunk.toString();

          if (buffer.match(/\n/)) {
            const parts = buffer.split(/\n/);

            buffer = parts.pop();

            for (const part of parts) {
              try {
                const blob = JSON.parse(part);
                if (this.props.log) console.log(this.props.blob);
                if (this.props.callback) {
                  try {
                    this.props.callback(blob);
                  } catch (err) {
                    console.log('stream callback error', err);
                  }
                }
              } catch (err) { return (err); }
            }
          }
        });
      });
  }
}

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
      endcallback: () => {
        // do something when stream has ended
        if (usersFolders) {
          usersFolders.forEach(async (currentFolder) => {
            await cache.existsAsync(`${userData.id}-${currentFolder}`).then(async (reply) => {
              const promises = [];
              // if folder doesnt exist
              if (reply !== 1) {
                await cache.saddAsync(`${userData.id}-folder-names`, currentFolder);
                pgnList.forEach(async (elem) => {
                  promises.push(
                    await cache.hsetAsync(
                      `${userData.id}-${currentFolder}`,
                      `${elem.pgn_id}`,
                      JSON.stringify(elem),
                    ),
                  );
                });
                await Promise.all(promises);

                cache.quit();
                return res.status(200).end();
              }

              await cache.saddAsync(`${userData.id}-folder-names`, currentFolder);
              pgnList.forEach(async (elem) => {
                promises.push(
                  await cache.hsetnxAsync(
                    `${userData.id}-${currentFolder}`,
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
      },
    });
    eventStreamer.stream();
  }
}

export default exportAll;
