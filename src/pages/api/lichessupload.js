const axios = require('axios');

async function handler(req, res, game_string) {
  const response = await axios.get("https://lichess.org/embed/" + game_string + "?theme=auto&bg=auto");
  if (response) {
    res.json(response.data);
  } else {
    res.json({});
  }
}

export default handler;