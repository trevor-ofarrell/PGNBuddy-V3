import fire from '../../../fire-config';
const axios = require('axios');
const fs = require('fs');
const ndjson = require( "ndjson" );

async function exportAll(req, res) {
  if (req.method === 'POST') {
    let username = req.body.username
    let startDate = new Date(req.body.startDate).getTime();
    let endDate = new Date(req.body.endDate).getTime();
    let user_data = req.body.user_data
    console.log(startDate, endDate)

    let response = await axios.get(
      "https://lichess.org/api/games/user/" + username,
      { params: {
          opening: "true",
          clocks: "true",
          since: startDate,
          until: endDate,
          max: 100,
          pgnInJson: "true",
        },
        headers: {
          "Accept": "application/x-ndjson" 
        },
      }
    );

    if (response) {
      let responseData = response.data
      console.log(response.data)

      fs.writeFile(`tmp/${username}-games.ndjson`, response.data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");

        fs.createReadStream(`tmp/${username}-games.ndjson`)
          .pipe(ndjson.parse())
          .on('data', function(obj) {
            console.log(obj)
            let iframeLink = "https://lichess.org/embed/" + obj.id + "?theme=wood4&bg=dark"
            let opening = ""
            let winner = ""
            if (obj.opening) {
              opening = obj.opening.name
            } else {
              opening = "No known opening"
            }
            if (obj.winner) {
              winner = obj.winner
            } else {
              winner = `No winner. Game was a ${obj.status}`
            }
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
                clock: obj.clock,
                players: obj.players,
              });
            console.log("PGN SAVED", pgnList)

          })
          fs.unlink(`tmp/${username}-games.ndjson`, (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
    });
      return res.status(200).end()
    } else {
      return res.status(405).end()
    }
  }
}

export default exportAll;
