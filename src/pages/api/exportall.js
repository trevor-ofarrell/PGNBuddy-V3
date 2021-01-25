import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function exportAll(req, res) {
    if (req.method === 'POST') {

      let username = req.body.username
      let folder = req.body.folder
      let startDate = new Date(req.body.startDate).getTime();
      let endDate = new Date(req.body.endDate).getTime();
      let user_data = req.body.user_data
      let opening = ""
      let winner = ""
      let whitePlayer = ""
      let blackPlayer = ""
      let whiteRating = ""
      let blackRating = ""
      let clock = {}

      bluebird.promisifyAll(redis.RedisClient.prototype);
      const cache = redis.createClient({
        port: process.env.LAMBDA_REDIS_PORT,
        host: process.env.LAMBDA_REDIS_ENDPOINT,
        password: process.env.LAMBDA_REDIS_PW,
      });

      console.log(startDate, endDate)

      let usersFolders = []
      let pgnList = []

      let uploadFolder
      let i = 0

      let eventStreamer = new NdjsonStreamer({

        url: `https://lichess.org/api/games/user/${username}?opening=true&since=${startDate}&until=${endDate}&max=100&pgnInJson=true`,
        token: process.env.LICHESS_API_TOKEN,
        timeout: 15000,

        timeoutCallback: _ => {
          return res.status(405).end()
        },
        callback: obj => {

          if (obj.opening) {
            opening = obj.opening.name
          } else {
            opening = "No known opening"
          }

          if (obj.winner) {
            winner = obj.winner
          } else if(obj.status !== 'outoftime') {
            winner = `No winner. Game resulted in a ${obj.status}`
          } else {
            winner = `No winner. Game resulted in a draw opon timeout`
          }

          if (obj.clock) {
            clock = obj.clock
          } else {
            clock = "No set time control"
          }

          if (folder) {
            uploadFolder = folder
          } else {
            let date = new Date
            date.setMilliseconds(0)
            date.setSeconds(0)
            uploadFolder = `lichess upload ${date}`
          }

          if (!obj.players.black.user) {blackPlayer = 'None'; blackRating = ''} else {
            blackPlayer = obj.players.black.user.name
            blackRating = obj.players.black.rating
          }
          if (!obj.players.white.user) {whitePlayer = 'None'; whiteRating = ''} else {
            whitePlayer = obj.players.white.user.name
            whiteRating = obj.players.white.rating
          }
          
          let pgn = {
            name: `${opening} - ${obj.variant} - ${obj.speed} - id: ${obj.id}`,
            pgn_id: obj.id,
            folder: uploadFolder,
            pgn: obj.pgn,
            moves: obj.moves,
            user_id: user_data.id,
            user_email: user_data.email,
            iframe: `https://lichess.org/embed/${obj.id}?theme=wood4&bg=dark`,
            rated: obj.rated,
            variant: obj.variant,
            speed: obj.speed,
            status: obj.status,
            winner: winner,
            opening: opening,
            clock: clock,
            black: blackPlayer,
            white:  whitePlayer,
            black_rating: blackRating,
            white_rating: whiteRating,
          }

          pgnList.push(pgn)
          i += 1
          console.log(i)

          if (usersFolders) {
            if (!usersFolders.includes(pgn.folder)) {
              usersFolders.push(pgn.folder)
            }
          } else {
            usersFolders.push(pgn.folder)
          }
        },
        endcallback: async () => {
          // do something when stream has ended
          if (usersFolders) {
            usersFolders.forEach(async (folder) => {
              await cache.existsAsync(`${user_data.id}-${folder}`).then(async reply => {
                if (reply !== 1) {
                  await cache.saddAsync(`${user_data.id}-folder-names`, folder)
                  pgnList.forEach( async (elem) => {
                    console.log(`${user_data.id}-${folder}`)

                    await cache.hsetAsync(
                      `${user_data.id}-${folder}`,
                      `${elem.pgn_id}`,
                      JSON.stringify(elem)
                    ).then(async reply => {
                        if (reply !== 1) {
                          console.log("hsetnx set failed")
                        } else {
                          console.log("hsetnx succeded")
                        }
                      })
                  })

                  cache.quit()
                  return res.status(200).end()

                }
                else {
                  await cache.saddAsync(`${user_data.id}-folder-names`, folder)
                  pgnList.forEach( async (elem) => {
                    console.log(`${user_data.id}-${folder}`)

                    await cache.hsetnxAsync(
                      `${user_data.id}-${folder}`,
                      `${elem.pgn_id}`,
                      JSON.stringify(elem)
                    ).then(async reply => {
                        if (reply !== 1) {
                          console.log("hsetnx set failed")
                        } else {
                          console.log("hsetnx succeded")
                        }
                      })
                  })

                  cache.quit()
                  return res.status(200).end()
                }
              })
            })
          } 
          else {
            console.log("cache failed")
            return res.status(500).end()
          }
        }
      })
      eventStreamer.stream()
    }
}




class NdjsonStreamer {
  constructor(props) {		
    this.props = props || {}
    this.token = this.props.token
    this.streaming = false
  }
	
	close() {
		if(!this.streaming) {
			return
		}

		this.streaming = false
		
		if(this.readable) {
			this.readable.destroy()
			this.readable = null
			console.log("stream closed", this.props.url)
		}
	}
	
	stream() {
		this.streaming = true
		this.readable = null
		let headers = {
			Accept: "application/x-ndjson"
		}

		if(this.token) headers.Authorization = `Bearer ${this.token}`

		let lastTick = new Date().getTime()

		if(this.props.timeout) {        
			let checkInterval = setInterval(_ => {
				if((new Date().getTime() - lastTick) > this.props.timeout * 1000) {
					clearInterval(checkInterval)
					if(this.props.timeoutCallback) this.props.timeoutCallback()
				}
			}, this.props.timeout / 3)
		}

		let buffer = ""

		console.log("streamNdjson", this.props)

		fetch(this.props.url, {
			headers: headers
		})
		.then(response => {
			console.log("stream started", this.props.url)
      this.readable = response.body
			this.readable.on('end', _ => {
				if(this.props.endcallback) this.props.endcallback()
			})

			this.readable.on('data', chunk => {                      
				lastTick = new Date().getTime()

				buffer += chunk.toString()

				if(buffer.match(/\n/)) {
					let parts = buffer.split(/\n/)

					buffer = parts.pop()

					for(let part of parts) {
						try{
							let blob = JSON.parse(part)
							if(this.props.log) console.log(this.props.blob)
							if(this.props.callback) {
								try{
									this.props.callback(blob)	
								}catch(err) {
									console.log("stream callback error", err)
								}								
							}
						}catch(err) {}
					}
				}
			})
		})
	}
}

export default exportAll;
