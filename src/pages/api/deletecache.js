import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletecache(req, res) {
    if (req.method === 'POST') {

        bluebird.promisifyAll(redis.RedisClient.prototype);

        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        let collectionPath = req.body.collectionPath

        if (collectionPath) {
            let status
            try {
                cache.del(collectionPath, (err, reply) => {
                    if (!err) {
                        if (reply === 1) {
                            console.log(`${collectionPath} is deleted`);
                            status = 1
                        } else {
                            console.log(`${collectionPath} doesn't exists`);
                            status = 0
                        }
                    }
                })
            }catch(err) {
                console.log('caught error', err)
            }
            cache.quit()
            if (status === 1) {
                console.log("flag is true")
                return res.status(200).end()
            } else {
                console.log("flag is false")
                return res.status(500).end()
            }
        }
        return res.status(500).end()
    }
}

export default deletecache;
