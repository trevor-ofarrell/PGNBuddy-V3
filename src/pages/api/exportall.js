import fire from '../../../fire-config';
const axios = require('axios');
const fs = require('fs');
const ndjson = require( "ndjson" );
import redis from 'redis';
import bluebird, { props } from 'bluebird';

class NdjsonStreamer{
	constructor(props){		
		this.props = props || {}
		
		this.token = this.props.token
		
		this.streaming = false
	}
	
	close(){
		if(!this.streaming){
			return
		}		
		
		this.streaming = false
		
		if(this.readable){
			this.readable.destroy()
			
			this.readable = null
			
			console.log("stream closed", this.props.url)
		}
	}
	
	stream(){
		this.streaming = true
		
		this.readable = null
		
		let headers = {
			Accept: "application/x-ndjson"
		}

		if(this.token) headers.Authorization = `Bearer ${this.token}`

		let lastTick = new Date().getTime()

		if(this.props.timeout){        
			let checkInterval = setInterval(_=>{
				if((new Date().getTime() - lastTick) > this.props.timeout * 1000){
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

				if(buffer.match(/\n/)){
					let parts = buffer.split(/\n/)

					buffer = parts.pop()

					for(let part of parts){
						try{
							let blob = JSON.parse(part)

							if(this.props.log) console.log(this.props.blob)

							if(this.props.callback){
								try{
									this.props.callback(blob)	
								}catch(err){
									console.log("stream callback error", err)
								}								
							}
						}catch(err){}
					}
				}
			})
		})
	}
}

async function exportAll(req, res) {
  if (req.method === 'POST') {
    let username = req.body.username
    let startDate = new Date(req.body.startDate).getTime();
    let endDate = new Date(req.body.endDate).getTime();
    let user_data = req.body.user_data
    console.log(startDate, endDate)
    let opening = ""
    let winner = ""
    let clock = {}
    bluebird.promisifyAll(redis.RedisClient.prototype);
    const cache = redis.createClient({
      port: process.env.LAMBDA_REDIS_PORT,
      host: process.env.LAMBDA_REDIS_ENDPOINT,
      password: process.env.LAMBDA_REDIS_PW,
    });

    let eventStreamer = new NdjsonStreamer({
      url: `https://lichess.org/api/games/user/${username}?opening=true&clocks=true&since=${startDate}&until=${endDate}&max=500&pgnInJson=true`,
      token: process.env.LICHESS_API_TOKEN,
      timeout: 20000,
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
        } else {
          winner = `No winner. Game resulted in a ${obj.status}`
        }
        if (obj.clock) {
          clock = obj.clock
        } else {
          clock = "No set time control"
        }
        let iframeLink = "https://lichess.org/embed/" + obj.id + "?theme=wood4&bg=dark"
        fire.firestore()
            .collection(`${user_data.id}-pgns`)
            .add({
              name: opening + ' - ' + obj.variant + ' - ' + obj.speed + ' - id: ' + obj.id ,
              pgn_id: obj.id,
              folder: `lichess upload ${new Date}`,
              pgn: obj.pgn,
              moves: obj.moves,
              user_id: user_data.id,
              user_email: user_data.email,
              iframe: iframeLink,
              rated: obj.rated,
              variant: obj.variant,
              speed: obj.speed,
              status: obj.status,
              winner: winner,
              opening: opening,
              clock: clock,
              players: obj.players,
            });
      },
      endcallback: async _ => {
        // do something when stream has ended
        await fire.firestore().collection(`${user_data.id}-pgns`)
        .get()
        .then(querySnapshot => {
          let pgnList = []
          querySnapshot.forEach( doc => {
            pgnList.push({ ...doc.data() })
          })
          if (pgnList.length > 0) {
            cache.set(`${user_data.id}-pgns`, JSON.stringify(pgnList));
      
          } else { 
            console.log("pgnlist null")
            return res.status(500).end()
          }
        })
        .catch(err => {
          console.log(err.message, "fuck")
          return res.status(500).end()
        })
        return res.status(200).end()
      }
    })

    eventStreamer.stream()

  }
}

export default exportAll;
