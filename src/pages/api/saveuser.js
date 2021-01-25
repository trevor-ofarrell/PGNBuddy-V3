import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function saveuser(req, res) {
    if (req.method === 'POST') {

        let username = req.body.username
        let email = req.body.email

        bluebird.promisifyAll(redis.RedisClient.prototype);

        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        await cache.hsetAsync(`users`, email, username).then(async reply => {
            if (reply !== 1) {
                console.log("hset set failed")
            } else {
                console.log("hset succeded", username)
            }
        })

        cache.quit()
        return res.status(200).end()
    }
}

export default saveuser;
