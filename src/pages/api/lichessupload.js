import fire from '../../../fire-config';
const axios = require('axios');

async function lichessUpload(req, res) {
  if (req.method === 'POST') {
    let pgn_name = req.body.name    
    let game_string = req.body.game_string
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

    console.log("this is the g string: " + game_string)
    let pgn_folder = req.body.folder
    let user_data = req.body.user_data
    let iframeLink = "https://lichess.org/embed/" + game_string + "?theme=wood4&bg=dark"

    let response = await axios.get("https://lichess.org/game/export/" + game_string + "?pgnInJson=true");

    if (response) {
      let responseData = response.data
      console.log("res received", response.data)
      fire.firestore()
        .collection(`${user_data.id}-pgns`)
        .add({
          name: pgn_name,
          pgn_id: game_string,
          folder: pgn_folder,
          pgn: response.data,
          user_data: user_data,
          user_id: user_data.id,
          user_email: user_data.email,
          iframe: iframeLink,
        });
      return res.status(200).end()
    } else {
      return res.status(405).end()
    }
  }
}

export default lichessUpload;
