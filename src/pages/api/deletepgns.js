import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletepgns(req, res) {
    if (req.method === 'POST') {

        let collectionPath = req.body.collectionPath

        bluebird.promisifyAll(redis.RedisClient.prototype);

        let userFolders = []

        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        await cache.smembersAsync(`${collectionPath}-folder-names`).then(async (names) => {
            names.forEach((name) => {
                userFolders.push(name)
            })

            cache.del(`${collectionPath}-folder-names`)
            userFolders.forEach((folder) => {
                cache.del(`${collectionPath}-${folder}`, (err, reply) => {
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
                cache.quit()
            })
        })
        console.log(collectionPath)
        cache.quit()
        return res.status(500).end()
    }
}

export default deletepgns;
