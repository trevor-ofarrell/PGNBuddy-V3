import fire from '../../../fire-config';
const axios = require('axios');
const fs = require('fs');
const ndjson = require( "ndjson" );
import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletecollection(req, res) {
    if (req.method === 'POST') {

        bluebird.promisifyAll(redis.RedisClient.prototype);
        const cache = redis.createClient();

        let collectionPath = req.body.collectionPath

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
                return res.status(405).end()
            }
        })
        return res.status(200).end()
    }
}

export default deletecollection;
