import fire from '../../../fire-config';
const axios = require('axios');

async function lichessUpload(req, res) {
  if (req.method === 'POST') {
    const pgn_name = req.body.name    
    const game_string = req.body.game_string
    console.log([pgn_name, game_string])
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
    const pgn_folder = req.body.folder
    const iframeLink = "https:lichess.org/embed" + game_string + "?theme=auto&bg=auto"
    const response = await axios.get("https://lichess.org/game/export/" + game_string + "?pgnInJson=true");
    if (response) {
      const responseData = response.data
      console.log("res received", response.data)
    } else {
      responseData = {}
    }
    fire.firestore()
      .collection('pgns')
      .add({
        name: pgn_name,
        gameString: game_string,
        folder: pgn_folder,
      });
    return (response.data)
  }
  return ("1")
}

export default lichessUpload;