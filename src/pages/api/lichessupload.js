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
      console.log("-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVi662UDcVWwie\nHRnXvDlJdlPfmDs9B66+JkbeZmzxXKGICBg6DzE0r/uUdSKDHlef48DWXbabb2aL\nMyIVp1MXJodwpDANfRwQ0x3efzQI+Zr69GaiAKICJa6EwtTe/noYcJ8sn4ZRmUuO\noh3ZEaHEuIevaOkK/q3cW+hUxGDZKMy/pInawG0iNiUfQ9FmIoXzBBo7ui7Lk0Rk\n1hiURgQVjWd1oI+EYxEfZ2Nx7gHUfpIXr2waI3ofPmFxupQSYQQfQKcRv30VZtae\nGPUaLSr9ZqsZwrOw1mm+D28EZTZP3p+xlwJpmU+dZT9SCYk+y71MTp3+QEN+8jVk\nWDoMEDUvAgMBAAECggEAFeQUJ7D3V0Nzr/2PjmKJukS9g2Ib7dOlk0U0I5M3yF8o\ncCrLLRiTOeS2/aTl7+6togSrclXWiMtWZfMOvr+3LJDhy63lMNxLEvVsjmjte5Da\nTHkhWv6fuJO+h8Wjdp8mzVQTIOubNG+tvUvi9accmJjwl89SKd9dIQA9Msdqa+9R\nKQydaoHv70mfZ8oiRg7OxofW8XmpWfHjcLQVq6VAqalHw/HDZbjrlHyxPpzr0MHz\nln6Od6VYdYQL9GAuql75B3fjRxF9bHmLRQWonv7oB5I2AXuoPPdiNnpiFgf4HblV\nWFmszmUouTzP0vNbsV31mgmTvaK2fRl3YZVaU7/KgQKBgQDOF6D5uDsNET0/C7oX\nD2sPpQsRtG9aRAQws6zV30dEDJx2CwxqJEEMaBi62FCzg145lkiQXG5eJvyvN+2p\nniP0lPFBJv0wInNdZrHBW5SxdFDtT/i1V2Auqr0cURNPKSJd5X7dTnhO6nUEDtog\niqqZlfd2QqJt1JXGvMbQ6cfAgQKBgQC5wof8qIyKqZgU1I+cNODT8hSxV09zhxXk\nKgCYrdh9RaMbCdvuodXnzjxLFq5wfspHOoKLd8xm+IzNGXEKCLVsw9TQsnlHLDel\nf3sDAC+aYo8gz2NzmVCuOUqYmnmXsT5sXip/9zLnr07vGOKRBKxaxrvDOBog+YyZ\nRM0zQTUdrwKBgQDNiFUbFneVxZ6OFJTm0JKWDKPoaUkv/WssYtQ4iy9Ylzcmpkgg\nRr20sNAQ7xA0pwu+ZLlDd1r+fOU9nYpgwXzcO/oKXubcLU9eU79stXeqLfVTZpED\n0Pr0L4TgC581MDG88NY/wTVMhphijqlNEN2oxB4CC9xPqlYg2D1zNeLngQKBgDkH\nV+hhdoQ7fM0oVM6IDV4EPAYV3/Z/ymC55GT7OjN7ZY+vfy3L0XfRAQGsfPFce41S\nkTFwHfie5dsxrFqAQfKaTIOlx0XqdUsB0CojrHmhOH/CK64Zq4NRY21mP14qtBdg\n8XtH0QD/+SO+aBBNdvyHdq2AU8U718ZWMQlDQ6NRAoGBAKmon50/D+3SzOIWBYuH\n/DWVrjMw91r5mUSrtAvl86iR0+S+ddmCt562zqI/H9yBNlBnkhEsVuZLI6y3/neq\nM4vy6LUr80+MFblq+zwBUrKb+rdgBZ+SDRpkG3jx+aUe6ks/W0TulwQdcPnIN+ki\nJeGHGRHiZVUKquc7a3E/iVwB\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'))
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
