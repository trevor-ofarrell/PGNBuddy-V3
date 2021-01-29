import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: 'pgnbuddy.firebaseapp.com',
  databaseURL: 'https://pgnbuddy.firebaseio.com',
  projectId: 'pgnbuddy',
  storageBucket: 'pgnbuddy.appspot.com',
  messagingSenderId: '207583183616',
  appId: '1:207583183616:web:20b5e65cb049f905fca9e5',
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;

export default fire;
