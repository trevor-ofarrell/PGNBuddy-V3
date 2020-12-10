import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletepgns(req, res) {
    if (req.method === 'POST') {

        let collectionPath = req.body.collectionPath

        bluebird.promisifyAll(redis.RedisClient.prototype);

        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        if (collectionPath) {
            cache.del(collectionPath, (err, reply) => {
                if (!err) {
                    if (reply === 1) {
                        cache.quit()
                        console.log(`${collectionPath} is deleted`);
                        return res.status(200).end()
                    } else {
                        cache.quit()
                        console.log(`${collectionPath} doesn't exists`);
                        return res.status(500).end()
                    }
                }else if (err) {
                    console.log(err)
                }
                else{
                    cache.quit()
                    console.log("cache delete failed", err)
                    return res.status(500).end()
                }
            })
        } else {
            console.log("collectionpath null")
            return res.status(500).end()
        }
        console.log("wtf happened")
        return res.status(500).end()
    }
}

export default deletepgns;
