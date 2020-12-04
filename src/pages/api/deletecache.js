import redis from 'redis';
import bluebird, { props } from 'bluebird';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
            cache.del(collectionPath, (err, reply) => {
                if (!err) {
                    if (reply === 1) {
                        cache.quit()
                        console.log(`${collectionPath} is deletedd`);
                        return res.status(200).end()
                    } else {
                        cache.quit()
                        console.log(`${collectionPath} doesn't exists`);
                        return res.status(500).end()
                    }
                }else{
                    cache.quit()
                    console.log("cache delete failed", err)
                    return res.status(500).end()
                }
            })
            await sleep(200);
        }
        return res.status(500).end()
    }
}

export default deletecache;
