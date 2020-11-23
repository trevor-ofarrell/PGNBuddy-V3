import fire from '../../../fire-config';
const axios = require('axios');

async function lichessUpload(req, res) {
  if (req.method === 'POST') {
    const pgn_name = req.body.name
    console.log(pgn_name)
    
    const game_string = req.game_string
    if (game_string.slice(0,7) === 'lichess') {
      game_string = game_string.slice(12,0)
    }else if (game_string.slice(0,5) === 'https') {
      game_string = game_string.slice(20,0)
    }else if (game_string.slice(0,5) === 'http:') {
      game_string = game_string.slice(20,0)
    }
    if (game_string.length !== 8) {
      game_string = game_string.slice(0,8)
    }
    const pgn_folder = req.form['folder']
    const iframeLink = "https:lichess.org/embed" + game_string + "?theme=auto&bg=auto"
    const response = await axios.get("https://lichess.org/game/export/" + game_string + "?pgnInJson=true");
    if (response) {
      const responseData = response.json
    } else {
      responseData = {}
    }
    fire.firestore()
      .collection('pgns')
      .add({
        name: name,
        gameString: gameString,
        folder: folder,
      });
  }
  console.log({
    "name": pgn_name,
    "id": game_string,
    "folder": pgn_folder
  })
  return ({
    "name": pgn_name,
    "id": game_string,
    "folder": pgn_folder
  })
}

export default lichessUpload;