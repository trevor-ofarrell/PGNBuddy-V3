import firebaseClient from 'firebase/app';
import 'firebase/auth';

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  const CLIENT_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: 'pgnbuddy.firebaseapp.com',
    databaseURL: 'https://pgnbuddy.firebaseio.com',
    projectId: "pgnbuddy",
    storageBucket: 'pgnbuddy.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID, 
  };

  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  window.firebase = firebaseClient;
}

export { firebaseClient };

