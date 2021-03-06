import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.PRIVATE_KEY,
      clientEmail: process.env.CLIENT_EMAIL,
      projectId: 'pgnbuddy',
    }),
    databaseURL: 'https://pgnbuddy.firebaseio.com',
  });
}

export { firebaseAdmin };
