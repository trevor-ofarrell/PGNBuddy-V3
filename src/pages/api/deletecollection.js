import fire from '../../../fire-config';
import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletecollection(req, res) {
    if (req.method === 'POST') {

        bluebird.promisifyAll(redis.RedisClient.prototype);

        const cache = redis.createClient({
            port: process.env.LAMBDA_REDIS_PORT,
            host: process.env.LAMBDA_REDIS_ENDPOINT,
            password: process.env.LAMBDA_REDIS_PW,
        });

        let collectionPath = req.body.collectionPath

        if (collectionPath) {
            await fire.firestore().collection(collectionPath)
                .get()
                .then(function(querySnapshot) {
                    let batch = fire.firestore().batch()
                    querySnapshot.forEach(function(doc) {
                        batch.delete(doc.ref)
                    })
                    batch.commit()
                })
            await cache.del(collectionPath, function(err, response) {
                if (response == 1) {
                    console.log("Deleted Successfully!")
                } else{
                    console.log("Cannot delete")
                }
            })     
            cache.quit()
            return res.status(200).end()
        }
        return res.status(500).end()
    }
}

export default deletecollection;