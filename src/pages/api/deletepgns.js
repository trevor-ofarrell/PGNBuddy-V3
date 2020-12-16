import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletepgns(req, res) {
    if (req.method === 'POST') {

        let collectionPath = req.body.collectionPath
        let collectionPath2 = req.body.collectionPath2

        bluebird.promisifyAll(redis.RedisClient.prototype);

        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        console.log(collectionPath)

        if (collectionPath) {
            cache.del(collectionPath2, collectionPath, (err, reply) => {
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
        await cache.existsAsync(collectionPath).then(async reply => {
            if (reply !== 1) { // cache miss, need to fetch
                console.log("cache null")
                return res.status(500).end()
            }else {
                console.log("guhhhhhhhh")
                return res.status(200).end()
            }
        })
    }
}

export default deletepgns;
