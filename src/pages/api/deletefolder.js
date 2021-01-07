import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletefolder(req, res) {
    if (req.method === 'POST') {

        let id = req.body.id
        let folderName = req.body.folderName

        bluebird.promisifyAll(redis.RedisClient.prototype);

        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        await cache.sremAsync(`${id}-folder-names`, folderName)
    
        cache.del(`${id}-${folderName}`, (err, reply) => {
          if (!err) {
              if (reply === 1) {
                  console.log(`${id} is deleted`);
              } else {
                  console.log(`${id} doesn't exists`);
              }
          }else if (err) {
              console.log(err)
          }
          else{
              console.log("cache delete failed", err)
              cache.quit()
              return res.status(500).end()
          }
          cache.quit()
        })
        cache.quit()
        return res.status(200).end()
    }
}

export default deletefolder;
