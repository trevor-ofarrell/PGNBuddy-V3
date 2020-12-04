import fire from '../../../fire-config';
import redis from 'redis';
import bluebird, { props } from 'bluebird';

async function deletecollection(req, res) {
    if (req.method === 'POST') {

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
                    console.log(`${collectionPath} collection is deletedd`);
                    return res.status(200).end()
                })
           
        }
        return res.status(500).end()
    }
}

export default deletecollection;
