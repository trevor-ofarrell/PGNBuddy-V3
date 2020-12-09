import fire from '../../../fire-config';
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

            await fire.firestore().collection(collectionPath)
                .get()
                .then(function(querySnapshot) {
                    let batch = fire.firestore().batch()
                    querySnapshot.forEach(function(doc) {
                        batch.delete(doc.ref)
                    })
                    batch.commit()
                    console.log(`${collectionPath} collection is deletedd`);
                })
                .then(async () => {
                    await cache.del(collectionPath, (err, reply) => {
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
                })
           
        }
        return res.status(500).end()
    }
}

export default deletepgns;
